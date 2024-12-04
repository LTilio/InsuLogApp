import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { useAuthContext } from "../context/AuthContext";
import { GlucoseLogList } from "../components/GlucoseList";
import { ButtonComponent } from "../components/ButtonComponent";

export function InfoScreen() {
  const { user } = useAuthContext();

  const HandlerAlert = () => {
    alert("Em construção");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Historico</Text>
      {user?.uid && <GlucoseLogList userId={user.uid} />}
      <View style={styles.containerbutton}>
        <ButtonComponent handleOnPress={HandlerAlert} title="Exportar" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    
  },
  containerbutton: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    
  },
  title: {
    paddingTop: 20,
    paddingBottom: 5,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
