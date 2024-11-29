import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useAuthContext } from "../context/AuthContext";
import { InputComponent } from "../components/InputComponent";
import { useState, useEffect, useRef } from "react";
import { ButtonComponent } from "../components/ButtonComponent";

export function HomeScreen() {
  const { user } = useAuthContext();
  const [glucose, setGlucose] = useState<string>("");
  const [insulinUsed, setInsulinUsed] = useState<string>("");
  const [insulinAmount, setInsulinAmount] = useState<string>("");

  const handleSubmit = async () => {
    console.log("foi");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="purple" />
      <View style={styles.containerAfericao}>
        <View style={styles.textRow}>
          <Text style={styles.textInfoA}>Última aferição:</Text>
          <Text style={styles.textDate}>28/10/2024 - 19:30</Text>
        </View>
      </View>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View style={styles.formContainer}>
            <Text style={styles.label}>Nível de glicose:</Text>
            <InputComponent
              placeHolder="Valor da Glicose"
              value={glucose}
              handleonChange={setGlucose}
              inputtype={false}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Tipo de insulina usada:</Text>
            <InputComponent placeHolder="Tipo de Insulina" value={insulinUsed} handleonChange={setInsulinUsed} />

            <Text style={styles.label}>Quantidade:</Text>
            <InputComponent
              placeHolder="Quantidade de Insulina"
              value={insulinAmount}
              handleonChange={setInsulinAmount}
              inputtype={false}
              keyboardType="numeric"
            />

            <ButtonComponent title="Registrar" handleOnChange={handleSubmit} />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  containerAfericao: {
    paddingTop: Platform.OS === "ios" ? 80 : 80,
    position: "absolute",
    top: 0,
    width: "100%",
    backgroundColor: "purple",
    paddingVertical: 25,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  textRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
  },
  textInfoA: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#fff",
  },
  textDate: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#fff",
  },
  formContainer: {
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
    paddingTop: 170,
  },
  label: {
    paddingTop: 25,
    paddingLeft: 20,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    alignSelf: "flex-start",
    width: "100%",
  },
});
