import { Keyboard, SafeAreaView, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";
import { useInsertDocument } from "../hooks/useInsertDoument";
import { Loader } from "../components/Loader";
import { ModalComponent } from "../components/ModalComponent";
import { useNavigation } from "@react-navigation/native";
import { GlucoseForm } from "../components/GlucoseForm";
import { CardLatestRegister } from "../components/CardLatestRegister";

export function HomeScreen() {
  const { user } = useAuthContext();
  const [modalState, setModalState] = useState<boolean>(false);
  const { insertDocument, state } = useInsertDocument("glucoseLog");
  const nav = useNavigation();

  const handleSubmit = async (
    data: { glucose: number; insulinUsed: string; insulinAmount: number },
    resetForm: () => void
  ) => {
    if (!user?.displayName) {
      console.error("Erro: Nome do usuário não encontrado!");
      setModalState(true);
      resetForm();
      return <ModalComponent handleModal={handleLogin} title="Erro de autenticação" modal={modalState} />;
    }

    if (user) {
      await insertDocument({
        glucose: data.glucose,
        insulinUsed: data.insulinUsed,
        insulinAmount: data.insulinAmount,
        userId: user?.uid,
        userName: user?.displayName ?? "sem nome do usuário",
      });
      resetForm();
      setModalState(true);
    } else {
      setModalState(true);
      resetForm();

      return <ModalComponent handleModal={handleLogin} title="Erro de autenticação" modal={modalState} />;
    }
  };

  const handleLogin = () => {
    setModalState(false);
    nav.navigate("TabLogout");
  };

  const handleHome = () => {
    setModalState(false);
    nav.navigate("TabInfo");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        {user?.uid && (
          <View style={styles.cardWrapper}>
            <CardLatestRegister userId={user.uid} />
          </View>
        )}

        {modalState && <ModalComponent handleModal={handleHome} title="Informações registradas" modal={modalState} />}
        {state.loading && <Loader />}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.formWrapper}>
            <GlucoseForm loading={state.loading} handleSubmitForm={handleSubmit} />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 50,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    width: "100%",
  },
  formWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
