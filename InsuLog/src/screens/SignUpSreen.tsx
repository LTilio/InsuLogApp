import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { AppUser } from "../@types/fireStore";
import { Button, Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { API_KEY, AUTH_DOMAIN } from "@env";
import { InputComponent } from "../components/InputComponent";
import { ButtonComponent } from "../components/ButtonComponent";
import { Loader } from "../components/Loader";
import { useNavigation } from "@react-navigation/native";

export function SignUpScreen() {
  const { signUp, loading, error } = useAuthContext();

  const [displayName, setDisplayName] = useState(""); // Nome de exibição
  const [email, setEmail] = useState(""); // Email
  const [password, setPassword] = useState(""); // Senha

  const nav = useNavigation();

  const handleSignUp = async () => {
    const user: AppUser = { email, password, displayName };
    await signUp(user); // Chama a função de cadastro
   
  };

  if(loading){
    return <Loader />;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>CADASTRO</Text>
        <InputComponent
          handleonChange={setDisplayName}
          value={displayName}
          placeHolder="Informe seu nome"
          inputtype={false}
        />
        <InputComponent handleonChange={setEmail} value={email} placeHolder="Informe seu email" inputtype={false} />
        <InputComponent
          handleonChange={setPassword}
          value={password}
          placeHolder="Informe sua senha"
          inputtype={true}
        />
        <ButtonComponent handleOnPress={handleSignUp} title="Cadastrar" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 50,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  errorText: {
    color: "red",
    marginBottom: 12,
  },
});
