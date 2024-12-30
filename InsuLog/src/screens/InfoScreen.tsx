import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { useAuthContext } from "../context/AuthContext";
import { GlucoseLogList } from "../components/GlucoseList";
import { ButtonComponent } from "../components/ButtonComponent";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

export function InfoScreen() {
  const { user } = useAuthContext();
  const [refreshKey, setRefreshKey] = useState(0);

  const nav = useNavigation();

  useEffect(() => {
    const unsubscribe = nav.addListener("focus", () => {
      // Sempre que a tela for focada, incrementa o refreshKey para forçar a re-renderização
      setRefreshKey(prevKey => prevKey + 1);
    });

    return unsubscribe; // Limpa o listener quando a tela for desmontada
  }, [nav]);


  const HandlerAlert = () => {
    alert("Em construção");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Historico</Text>
      {user?.uid && <GlucoseLogList key={refreshKey} userId={user.uid} />}
      {/* <View style={styles.containerbutton}> */}
      <ButtonComponent handleOnPress={HandlerAlert} title="Exportar" />
      {/* </View> */}
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
  // containerbutton: {
  //   width: "100%",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: 'red'

  // },
  title: {
    paddingTop: 20,
    paddingBottom: 5,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
