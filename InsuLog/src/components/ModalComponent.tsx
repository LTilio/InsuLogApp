import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PropsModal {
  title: string;
  handleModal: () => void;
  modal: boolean;
}

export function ModalComponent({ title, handleModal, modal }: PropsModal) {
  return (
    <Modal transparent={true} visible={modal} animationType="slide">
      <View style={styles.containerModal}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity style={styles.button} onPress={handleModal}>
            <Text style={styles.titleButton}>voltar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  containerModal: {
    flex: 1,
    backgroundColor: "rgba(219, 217, 222,.9)",
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    backgroundColor: "rgba(219, 217, 222,1)",
    width: "90%",
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "purple",
    borderWidth: 1,
    borderRadius: 10,
  },

  title: {
    textAlign: "center",
    color: "#021627",
    fontSize: 25,
    fontWeight: "bold",
    paddingBottom: 20,
  },

  button: {
    width: "80%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "purple",
    marginTop: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
  },

  titleButton: {
    color: "#fff",
    fontSize: 18,
  },
});
