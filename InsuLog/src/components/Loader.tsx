import { ActivityIndicator, StyleSheet, View } from "react-native";

export const Loader = () => {
  return (
    <View style={styles.loaderOverlay}>
      <ActivityIndicator size="large" color="#000" />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderOverlay: {
    // flex:1,
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
});
