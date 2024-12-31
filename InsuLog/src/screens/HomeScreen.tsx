import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";
import { useInsertDocument } from "../hooks/useInsertDoument";
import { Loader } from "../components/Loader";
import { ModalComponent } from "../components/ModalComponent";
import { useNavigation } from "@react-navigation/native";
import { GlucoseForm } from "../components/GlucoseForm";
import { CardLatestRegister } from "../components/CardLatestRegister";
import { Share } from "react-native";
import { useFetchLatestDoc } from "../hooks/useFetchDocument";
import { GlucoseLog } from "../@types/fireStore";

export function HomeScreen() {
  const { user } = useAuthContext();
  const [modalState, setModalState] = useState<{
    visible: boolean;
    title: string;
    type: "success" | "error";
  }>({ visible: false, title: "", type: "success" });
  const { insertDocument, state } = useInsertDocument("glucoseLog");
  const [refreshKey, setRefreshKey] = useState(0);
  const [newDocToShare, setNewDocToShare] = useState<GlucoseLog | null>();
  const nav = useNavigation();

  const { document: latestDoc } = useFetchLatestDoc({
    docCollection: "glucoseLog",
    userId: user?.uid ?? "",
  });

  const handleSubmit = async (
    data: { glucose: number; insulinUsed: string; insulinAmount: number },
    resetForm: () => void
  ) => {
    if (!user?.displayName) {
      console.error("Erro: Nome do usuário não encontrado!");
      setModalState({
        visible: true,
        title: "Erro: Nome do usuário não encontrado!",
        type: "error",
      });
      resetForm();
      return;
    }

    if (user) {
      const newDocument = {
        glucose: data.glucose,
        insulinUsed: data.insulinUsed,
        insulinAmount: data.insulinAmount,
        userId: user?.uid,
        userName: user?.displayName ?? "sem nome do usuário",
      };
      await insertDocument(newDocument);
      setNewDocToShare({ ...newDocument, createdAt: new Date() });
      resetForm();
      setRefreshKey((prevKey) => prevKey + 1);
      setModalState({
        visible: true,
        title: "Informações registradas",
        type: "success",
      });
    } else {
      console.error("Erro: Usuário não autenticado!");
      setModalState({
        visible: true,
        title: "Erro: Usuário não autenticado!",
        type: "error",
      });
      resetForm();
    }
  };

  const handleShare = async () => {
    const docToShare = newDocToShare || latestDoc;

    if (!docToShare) {
      console.error("Nenhum registro encontrado para compartilhar.");
      setModalState({
        visible: true,
        title: "Erro: Nenhum registro encontrado!",
        type: "error",
      });
      return;
    }

    const createdAtDate =
      docToShare.createdAt instanceof Date ? docToShare.createdAt : new Date(docToShare.createdAt || Date.now());

    const formattedDate = createdAtDate.toLocaleDateString("pt-BR");
    const formattedTime = createdAtDate.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Sao_Paulo",
    });

    const message = `
💉 *Registro de Glicose* 💉

*Glicose*: ${docToShare.glucose} mg/dL
*Insulina Utilizada*: ${docToShare.insulinUsed}
*Quantidade*: ${docToShare.insulinAmount} und
*Data*: ${formattedDate}
*Hora*: ${formattedTime}
`.trim();

    try {
      await Share.share({ message });
      setNewDocToShare(null);
    } catch (error) {
      console.error("Erro ao compartilhar:", error);
      setModalState({
        visible: true,
        title: "Erro ao compartilhar...",
        type: "error",
      });
    }
  };

  const handleHome = () => {
    setModalState({ visible: false, title: "", type: "success" });
    setNewDocToShare(null);
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {user?.uid && (
              <View style={styles.cardWrapper}>
                <CardLatestRegister key={refreshKey} userId={user?.uid} />
              </View>
            )}

            {modalState.visible && (
              <ModalComponent
                handleModal={handleHome}
                title={modalState.title}
                modal={modalState.visible}
                onShare={modalState.type === "success" ? handleShare : undefined} // Botão de compartilhar apenas no sucesso
              />
            )}

            {state.loading && <Loader />}

            <View style={styles.formWrapper}>
              <GlucoseForm loading={state.loading} handleSubmitForm={handleSubmit} />
            </View>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  cardWrapper: {
    alignItems: "center",
  },
  formWrapper: {
    alignItems: "center",
  },
});
