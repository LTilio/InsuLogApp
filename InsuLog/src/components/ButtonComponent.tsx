import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PropsComponent {
  title: string;
  handleOnPress: () => void;
  disable?: boolean;
}

export function ButtonComponent({ handleOnPress, title, disable }: PropsComponent) {
  return (
    <TouchableOpacity
      onPress={handleOnPress}
      style={[styles.button, disable && styles.buttonDisabled]}
      disabled={disable}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

export const styles = StyleSheet.create({
  button: {
    marginBlock: 10,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#000",
    alignItems: "center",
    width: "90%",
  },
  buttonDisabled: {
    backgroundColor: "#d0b1e0",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
