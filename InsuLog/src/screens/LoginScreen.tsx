import { StyleSheet, Text, View } from "react-native";
import { InputComponent } from "../components/InputComponent";
import { useState } from "react";
import { ButtonComponent } from "../components/ButtonComponent";
import { useAuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

export function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const { loading, error, signIn } = useAuthContext();
  const nav = useNavigation();

  const handleLogin = async () => {
    console.log("entrou no handle login");
    await signIn(email, password);
  };

  const handleSignUp = async () => {
    nav.navigate("StackSignUpScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>InsuLog</Text>
      <InputComponent placeHolder="Email" value={email} inputtype={false} handleonChange={setEmail} />
      <InputComponent placeHolder="Senha" value={password} inputtype={true} handleonChange={setPassword} />
      <ButtonComponent title="Entrar" handleOnChange={handleLogin} />
      <ButtonComponent title="Faça seu cadastro" handleOnChange={handleSignUp} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
