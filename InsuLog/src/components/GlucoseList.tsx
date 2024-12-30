import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { GlucoseLog } from "../@types/fireStore";
import { useFetchAllDocs } from "../hooks/useFetchAllDocs";

interface GlucoseLogListProps {
  userId: string;
}

export const GlucoseLogList = ({ userId }: GlucoseLogListProps) => {
  const { documents, error, loading, fetchMoreDocs, hasMore } = useFetchAllDocs("glucoseLog", userId);

  const renderItem = ({ item }: { item: GlucoseLog }) => {
    const date = new Date(item.createdAt?.seconds * 1000);
    const formattedDate = date.toLocaleDateString("pt-BR");
    const formattedTime = date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Data:</Text>
          <Text style={styles.value}>{formattedDate}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Hora:</Text>
          <Text style={styles.value}>{formattedTime}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Glicose:</Text>
          <Text style={styles.value}>{item.glucose} mg/dL</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Insulina Usada:</Text>
          <Text style={styles.value}>{item.insulinUsed}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Quantidade:</Text>
          <Text style={styles.value}>{item.insulinAmount} U</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {error && <Text style={styles.errorText}>{error}</Text>}

      <FlatList
        data={documents}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.uid?.toString() || index.toString()}
        onEndReached={hasMore ? fetchMoreDocs : null}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="#000" /> : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginBottom: 10,
  },
  card: {
    marginInline:20,
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 5,
    marginTop: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
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
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});
