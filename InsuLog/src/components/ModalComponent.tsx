import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BlurView } from "expo-blur"; // Importando BlurView

interface PropsModal {
  title: string;
  handleModal: () => void;
  modal: boolean;
}

export function ModalComponent({ title, handleModal, modal }: PropsModal) {
  return (
    <Modal transparent={true} visible={modal} animationType="slide">
      <BlurView intensity={90} tint="dark" style={styles.containerModal}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity style={styles.button} onPress={handleModal}>
            <Text style={styles.titleButton}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  containerModal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    backgroundColor: "rgba(255, 255, 255, 1)", // Fundo branco translúcido
    width: "90%",
    height: "30%",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#000",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },

  title: {
    textAlign: "center",
    color: "#000", // Roxo suave para o título
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  button: {
    marginTop:20,
    width: "90%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000", // Roxo pastel no botão
    borderRadius: 10,
  },

  titleButton: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
