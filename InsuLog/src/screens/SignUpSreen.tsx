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

  const handleLoginScreen = async () => {
    nav.goBack();
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.outerContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>CADASTRO</Text>
          <Text style={styles.label}>Nome de exibição:</Text>
          <TextInput
            style={styles.input}
            placeholder="Informe seu nome"
            value={displayName}
            onChangeText={setDisplayName}
          />
          <Text style={styles.label}>Email: </Text>
          <TextInput style={styles.input} onChangeText={setEmail} value={email} placeholder="Informe seu email" />
          <Text style={styles.label}>Senha: </Text>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Informe sua senha"
            secureTextEntry
          />
          <ButtonComponent handleOnPress={handleSignUp} title="Cadastrar"/>
          <ButtonComponent handleOnPress={handleLoginScreen} title="Volta" />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: "65%",
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    padding: 10,
    borderRadius: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  outerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0", // Cor de fundo opcional
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    alignSelf: "flex-start",
    marginLeft: "8%",
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    width: "90%",
    height: 55,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 15,
    backgroundColor: "#f9f9f9",
    marginBottom: 15,
    fontSize: 16,
  },
});
