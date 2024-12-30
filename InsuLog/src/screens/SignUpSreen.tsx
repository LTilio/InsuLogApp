import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { AppUser } from "../@types/fireStore";
import {
  Button,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { API_KEY, AUTH_DOMAIN } from "@env";
import { InputComponent } from "../components/InputComponent";
import { ButtonComponent } from "../components/ButtonComponent";
import { Loader } from "../components/Loader";
import { useNavigation } from "@react-navigation/native";
import logo from "../../assets/InsuLogLogo.png";
export function SignUpScreen() {
  const { signUp, loading, error } = useAuthContext();

  const [displayName, setDisplayName] = useState(""); // Nome de exibição
  const [email, setEmail] = useState(""); // Email
  const [password, setPassword] = useState(""); // Senha
  const [inputError, setInputError] = useState(""); // Novo estado para erros personalizados

  const nav = useNavigation();

  const handleSignUp = async () => {
    setInputError(""); // Reseta o erro

    if (!displayName || !email || !password) {
      setInputError("Por favor, preencha todos os campos.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setInputError("Por favor, insira um email válido.");
      return;
    }

    const user: AppUser = { email, password, displayName };
    await signUp(user); // Chama a função de cadastro
  };

  const handleLoginScreen = async () => {
    nav.goBack();
  };

  return (
    <KeyboardAvoidingView style={styles.outerContainer} behavior={Platform.OS === "ios" ? "padding" : "height"}>
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
          {/* <Text style={styles.title}>Cadastro:</Text> */}
          <InputComponent
            placeHolder="Nome de exibição"
            value={displayName}
            inputtype={false}
            handleonChange={setDisplayName}
          />
          <InputComponent placeHolder="Email" value={email} inputtype={false} handleonChange={setEmail} />
          <InputComponent placeHolder="Senha" value={password} inputtype={true} handleonChange={setPassword} />
          {(inputError || error) && <Text style={styles.errorText}>{inputError || error}</Text>}
          {loading && <Loader />}
          <ButtonComponent title="Cadastrar" handleOnPress={handleSignUp} disable={loading} />
          <ButtonComponent title="Voltar" handleOnPress={handleLoginScreen} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    marginBlock: 50,
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
  // title: {
  //   fontSize: 20,
  //   fontWeight: "bold",
  //   marginBottom: 10,
  //   alignSelf: 'flex-start',
  //   paddingLeft: 20,
  // },
  errorText: {
    color: "red",
    marginVertical: 10,
    fontSize: 14,
    textAlign: "center",
  },
});
