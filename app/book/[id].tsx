import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import Animated, { FadeIn } from "react-native-reanimated";

export default function BookDetailScreen() {
  const { id, author, title } = useLocalSearchParams();

  const decodedTitle = title ? decodeURIComponent(title as string) : "";
  const decodedAuthor = author ? decodeURIComponent(author as string) : "";

  const navigation = useNavigation();
  React.useEffect(() => {
    navigation.setOptions({ title: decodedTitle || "Detail Buku" });
  }, [decodedTitle]);

  return (
    <LinearGradient colors={["#89f7fe", "#66a6ff"]} style={styles.container}>
      <Animated.View entering={FadeIn.duration(500)}>
        <Card style={styles.card}>
          <MaterialIcons
            name="menu-book"
            size={60}
            color="#4a90e2"
            style={{ alignSelf: "center" }}
          />
          <Text variant="headlineMedium" style={styles.title}>
            {decodedTitle || "Untitled Book"}
          </Text>
          <Text variant="titleMedium" style={styles.author}>
            ✍️ {decodedAuthor || "Unknown Author"}
          </Text>
          <Text variant="bodyMedium" style={styles.id}>
            ID: {id}
          </Text>

          {/* <Button
            mode="contained"
            style={styles.button}
            icon="arrow-left"
            onPress={() => router.back()}
          >
            Kembali
          </Button> */}
        </Card>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  card: {
    width: "100%",
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#fff",
    elevation: 5,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 8,
    color: "#333",
  },
  author: {
    textAlign: "center",
    marginBottom: 8,
    color: "#666",
  },
  id: {
    textAlign: "center",
    color: "#999",
    marginBottom: 16,
  },
  button: {
    marginTop: 10,
    borderRadius: 8,
  },
});
