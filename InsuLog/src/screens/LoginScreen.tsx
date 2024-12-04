import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView } from "react-native";
import { InputComponent } from "../components/InputComponent";
import { useState } from "react";
import { ButtonComponent } from "../components/ButtonComponent";
import { useAuthContext } from "../context/AuthContext";
import { Loader } from "../components/Loader";
import { useNavigation } from "@react-navigation/native";

export function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputError, setInputError] = useState(""); // Novo estado para erros personalizados

  const { loading, error, signIn } = useAuthContext();

  const nav = useNavigation();

  const handleLogin = async () => {
    setInputError(""); // Reseta o erro

    if (!email || !password) {
      setInputError("Por favor, preencha todos os campos.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setInputError("Por favor, insira um email válido.");
      return;
    }

    await signIn(email, password);
  };

  return (
    <KeyboardAvoidingView style={styles.outerContainer} behavior="padding">
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>InsuLog</Text>
          <InputComponent placeHolder="Email" value={email} inputtype={false} handleonChange={setEmail} />
          <InputComponent placeHolder="Senha" value={password} inputtype={true} handleonChange={setPassword} />
          {(inputError || error) && <Text style={styles.errorText}>{inputError || error}</Text>}
          {loading && <Loader />}
          <ButtonComponent title="Entrar" handleOnPress={handleLogin} disable={loading} />
          <ButtonComponent title="Faça seu cadastro" handleOnPress={() => nav.navigate("StackSignUpScreen")} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "95%",
    paddingInline: 5,
    paddingBlock: 40,
    borderRadius: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
  },
  errorText: {
    color: "red",
    marginVertical: 10,
    fontSize: 14,
    textAlign: "center",
  },
});
