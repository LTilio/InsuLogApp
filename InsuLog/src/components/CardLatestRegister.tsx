import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useFetchLatestDoc } from "../hooks/useFetchDocument";
import { Timestamp } from "firebase/firestore";

interface CardLatestProps {
  userId: string;
}

export const CardLatestRegister = ({ userId }: CardLatestProps) => {
  const { document, loading, error } = useFetchLatestDoc({
    docCollection: "glucoseLog",
    userId,
  });

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
        <ActivityIndicator size="small" color="#000" />
      </View>
    );
  }

  const { glucose, createdAt } = document;

  // Verificando se createdAt é um Timestamp e ajustando o fuso horário
  let formattedDate = "Data indisponível";
  let formattedTime = "Hora indisponível";

  if (createdAt instanceof Timestamp) {
    const date = createdAt.toDate(); // Converte Timestamp para Date
    
    // Usando o método toLocaleDateString e toLocaleTimeString para ajustar o fuso horário
    formattedDate = date.toLocaleDateString("pt-BR");
    formattedTime = date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Sao_Paulo", // Ajustando para o fuso horário de São Paulo (UTC-3)
    });
  } else {
    console.warn("Campo createdAt não é um Timestamp:", createdAt);
  }
  
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Ultimo registro</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Nivel de glicose:</Text>
        <Text style={styles.value}>{glucose} mg/dL</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Data:</Text>
        <Text style={styles.value}>{formattedDate}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Hora:</Text>
        <Text style={styles.value}>{formattedTime}</Text>
      </View>
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
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    fontSize: 20,
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
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  label: {
    fontSize: 16,
    color: "#333",
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});
