import { ActivityIndicator, Modal, StyleSheet, View } from "react-native";

export const Loader = () => {
  return (
    <Modal transparent={true} animationType="fade">
      <View style={styles.loaderOverlay}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  loaderOverlay: {
    position: "absolute", // Faz o loader ocupar toda a tela
    top: 0, // Alinha ao topo
    left: 0, // Alinha à esquerda
    right: 0, // Alinha à direita
    bottom: 0, // Alinha ao fundo (faz com que cubra a TabBar)
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Cor de fundo com transparência
    justifyContent: "center", // Alinha o conteúdo no centro
    alignItems: "center", // Centraliza o indicador de carregamento
    zIndex: 1000, // Coloca o loader acima de outros componentes
  },
});
