import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useFetchLatestDoc } from "../hooks/useFetchDocument";

interface cardLatest {
  userId: string;
}

export const CardLatestRegister = ({ userId }: cardLatest) => {
  const { document, loading, error } = useFetchLatestDoc("glucoseLog", userId);

  if (!userId) {
    return (
      <View style={styles.card}>
        <Text style={styles.errorText}>Erro ao carregar os dados.</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.card}>
        <ActivityIndicator size="small" color="#000" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.card}>
        <Text style={styles.errorText}>Erro ao carregar os dados.</Text>
      </View>
    );
  }

  if (!document) {
    return (
      <View style={styles.card}>
        <Text style={styles.errorText}>Nenhum registro encontrado.</Text>
      </View>
    );
  }

  const { glucose, createdAt } = document;

  // Usando toDate() para converter o Timestamp diretamente
  const date = createdAt?.toDate ? createdAt.toDate() : new Date(createdAt);

  const formattedDate = date.toISOString().split("T")[0];
  const formattedTime = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Last Glucose Entry</Text>
      <Text style={styles.text}>Glucose Level: {glucose} mg/dL</Text>
      <Text style={styles.text}>Date: {formattedDate}</Text>
      <Text style={styles.text}>Time: {formattedTime}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
    margin: 10,
    width: "90%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
});
