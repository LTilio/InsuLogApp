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

export function HomeScreen() {
  const { user } = useAuthContext();
  const [modalState, setModalState] = useState<boolean>(false);
  const { insertDocument, state } = useInsertDocument("glucoseLog");
  const [refreshKey, setRefreshKey] = useState(0);
  const nav = useNavigation();

  // Usando o hook diretamente dentro do componente
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
      setModalState(true);
      resetForm();
      return;
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
      setRefreshKey((prevKey) => prevKey + 1); // Força re-renderização da tabela
      setModalState(true); // Abre o modal após o registro
    } else {
      console.error("Erro: Usuário não autenticado!");
      setModalState(true);
      resetForm();
    }
  };

  const handleShare = async () => {
    if (!latestDoc) {
      console.error("Nenhum registro encontrado para compartilhar.");
      setModalState(true);
      return;
    }

    const createdAtDate = latestDoc.createdAt?.toDate ? latestDoc.createdAt.toDate() : new Date(latestDoc.createdAt);
    const formattedDate = createdAtDate.toLocaleDateString("pt-BR");
    const formattedTime = createdAtDate.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Sao_Paulo",
    });

    const message = `
💉 *Registro de Glicose* 💉

*Glicose*: ${latestDoc.glucose} mg/dL
*Insulina Utilizada*: ${latestDoc.insulinUsed}
*Quantidade*: ${latestDoc.insulinAmount} und
*Data*: ${formattedDate}
*Hora*: ${formattedTime}
`.trim();

    try {
      await Share.share({ message });
    } catch (error) {
      console.error("Erro ao compartilhar:", error);
      setModalState(true);
    }
  };

  const handleLogin = () => {
    setModalState(false);
    nav.navigate("TabLogout");
  };

  const handleHome = () => {
    setModalState(false);
    setRefreshKey((prevKey) => prevKey + 1); // Garante a atualização dos dados
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
            showsVerticalScrollIndicator={false} // Desabilita o indicador de rolagem (opcional)
          >
            {user?.uid && (
              <View style={styles.cardWrapper}>
                <CardLatestRegister key={refreshKey} userId={user?.uid} />
              </View>
            )}

            {modalState && (
              <ModalComponent
                handleModal={handleHome}
                title="Informações registradas"
                modal={modalState}
                onShare={handleShare}
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
    flexGrow: 1, // Garante que o conteúdo ocupe toda a altura disponível
    justifyContent: "center", // Ajuste o alinhamento conforme necessário
  },
  cardWrapper: {
    alignItems: "center",
  },
  formWrapper: {
    alignItems: "center",
  },
});
