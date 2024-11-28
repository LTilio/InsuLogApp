import { createContext, ReactNode, useContext } from "react";
import { useAuth } from "../hooks/useAuth";
import { User } from "firebase/auth";

interface AuthContextType{
    user: User | null;
    loading: boolean;
    error: string | null;
    signUp: ReturnType<typeof useAuth>["signUp"];
    signIn: ReturnType<typeof useAuth>["signIn"];
    logOut: ReturnType<typeof useAuth>["logOut"];
}

//cria o contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
  }
export const AuthProvider = ({children}: AuthProviderProps) =>{
    const { state, signUp, signIn, logOut } = useAuth();

    return(
        <AuthContext.Provider value={{
            user: state.user,
            loading: state.loading,
            error: state.error,
            signUp,
            signIn,
            logOut,

        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = ()=>{
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuthContext deve ser usado dentro de um AuthProvider")
    }
    return context;
}