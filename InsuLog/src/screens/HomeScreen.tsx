import { Keyboard, SafeAreaView, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
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
    userId: user?.uid ?? "", // Garantindo que o userId seja uma string válida
  });

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
      handleNewLogInsert();
      setModalState(true);
      setRefreshKey(prevKey => prevKey + 1);
    } else {
      setModalState(true);
      resetForm();

      return <ModalComponent handleModal={handleLogin} title="Erro de autenticação" modal={modalState} />;
    }
  };

  const handleNewLogInsert = () => {
    setRefreshKey(prevKey => prevKey + 1); // Atualiza a chave para forçar re-renderização
    nav.navigate('TabInfo'); // Navega para a tela Info para forçar a atualização
  };

  const handleShare = async () => {
    if (!latestDoc) {
      console.error("Nenhum registro encontrado para compartilhar.");
      setModalState(true);
      return <ModalComponent handleModal={handleHome} title="Nenhum registro encontrado" modal={modalState} />;
    }

    const createdAtDate = latestDoc.createdAt?.toDate ? latestDoc.createdAt.toDate() : new Date(latestDoc.createdAt);
    const formattedDate = createdAtDate.toLocaleDateString("pt-BR");
    const formattedTime = createdAtDate.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
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
      return <ModalComponent handleModal={handleHome} title="Erro ao compartilhar" modal={modalState} />;
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
  },
  scrollContainer: {
    flexGrow: 1,
    flex: 1,
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
