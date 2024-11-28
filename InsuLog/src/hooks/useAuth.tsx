
import { FirebaseAuthTypes } from '@react-native-firebase/auth'; // Importação para o tipo User no React Native
import { useEffect, useReducer } from "react";
import { auth } from "../fireBase/Config"; // Importação correta do auth
import { AppUser } from "../@types/fireStore"; // Tipagem para o usuário
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, User } from 'firebase/auth';

interface AuthState {
  user: User | null; 
  loading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: "LOADING" }
  | { type: "SUCCESS"; payload: User } 
  | { type: "ERROR"; payload: string }
  | { type: "LOGOUT" };

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true, error: null };
    case "SUCCESS":
      return { ...state, loading: false, user: action.payload, error: null };
    case "ERROR":
      return { ...state, loading: false, error: action.payload, user: null };
    case "LOGOUT":
      return { ...state, user: null, loading: false, error: null };
    default:
      return state;
  }
};

const minLoaderTime = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useAuth = () => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Resgata informações no AsyncStorage
  useEffect(() => {
    const loadUser = async () => {
      dispatch({ type: "LOADING" });

      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          const user = JSON.parse(userData);
          await minLoaderTime(1500);
          dispatch({ type: "SUCCESS", payload: user });
        } else {
          dispatch({ type: "LOGOUT" });
        }
      } catch (error) {
        dispatch({ type: "ERROR", payload: "Erro ao carregar usuário" });
        console.log("Erro ao carregar usuário do AsyncStorage", error);
      }
    };
    loadUser();
  }, []);

  // Função para salvar o usuário no AsyncStorage
  const saveUserToStorage = async (user: User) => { // Alterado para o tipo correto
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.log("Erro ao salvar dados do usuário:", error);
    }
  };

  // Função para remover o usuário do AsyncStorage
  const removeUserFromStorage = async () => {
    try {
      await AsyncStorage.removeItem("user");
    } catch (error) {
      console.log("Erro ao remover dados do usuário:", error);
    }
  };

  // Cadastro
  const signUp = async (user: AppUser) => {
    dispatch({ type: "LOADING" });

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
      await updateProfile(userCredential.user, { displayName: user.displayName });

      await minLoaderTime(1500);

      dispatch({ type: "SUCCESS", payload: userCredential.user });
      await saveUserToStorage(userCredential.user);
    } catch (error: any) {
      console.log("Error during sign up:", error);
      dispatch({ type: "ERROR", payload: `Erro no cadastro: ${error.message}` });
    }
  };

  // Login
  const signIn = async (email: string, password: string) => {
    dispatch({ type: "LOADING" });

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      await minLoaderTime(1500);
      dispatch({ type: "SUCCESS", payload: userCredential.user });
      await saveUserToStorage(userCredential.user);
    } catch (error: any) {
      dispatch({ type: "ERROR", payload: `Erro no login: ${error.message}` });
    }
  };

  // Logout
  const logOut = async () => {
    dispatch({ type: "LOADING" });

    try {
      await minLoaderTime(1500);
      await signOut(auth);
      dispatch({ type: "LOGOUT" });
      await removeUserFromStorage();
    } catch (error: any) {
      dispatch({ type: "ERROR", payload: `Erro ao deslogar: ${error.message}` });
    }
  };

  return { signIn, signUp, logOut, state };
};
