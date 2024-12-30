import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, SafeAreaView, Platform, Image } from "react-native";
import { InputComponent } from "../components/InputComponent";
import { useState } from "react";
import { ButtonComponent } from "../components/ButtonComponent";
import { useAuthContext } from "../context/AuthContext";
import { Loader } from "../components/Loader";
import { useNavigation } from "@react-navigation/native";
import logo from "../../assets/InsuLogLogo.png";
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
    <KeyboardAvoidingView style={styles.innerContainer} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: 'center',
              marginBottom:25,
            }}
          >
            <Image source={logo} style={{ width: 70, height: 70, marginRight: -5 }} />
            <Text style={{ fontSize: 28 }}>
              Insu  
              <Text style={{ fontWeight: "bold", fontSize: 30 }}>Log</Text>
            </Text>
          </View>

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
  innerContainer: {
    flex: 1,
    marginBlock: 75,
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
    fontSize: 14,
    textAlign: "center",
  },
});
