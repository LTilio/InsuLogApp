import { StyleSheet, Text, View } from "react-native";
import { useAuthContext } from "../context/AuthContext";

export function HomeScreen() {

const {user} = useAuthContext();

    return (
      <View style={styles.container}>
        <Text style={styles.title}>InsuLog</Text>
        <Text style={styles.title}>HOME</Text>
        <Text style={styles.title}>{user?.displayName}</Text>
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5f5f5",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 8,
    },
  });