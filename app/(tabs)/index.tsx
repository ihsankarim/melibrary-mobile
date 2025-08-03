import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import "react-native-get-random-values";
import { Button, Card, IconButton, Text, TextInput } from "react-native-paper";
import Animated from "react-native-reanimated";
import SwipeableItem from "react-native-swipeable-item";
import { v4 as uuidv4 } from "uuid";

export default function HomeScreen() {
  const [books, setBooks] = useState([
    { id: uuidv4(), title: "Belajar React Native", author: "John Doe" },
    { id: uuidv4(), title: "Pemrograman JavaScript", author: "Jane Smith" },
  ]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const addOrUpdateBook = () => {
    if (!title || !author) {
      Alert.alert("Error", "Judul dan Penulis harus diisi!");
      return;
    }

    if (editId) {
      setBooks((prev) =>
        prev.map((book) =>
          book.id === editId ? { ...book, title, author } : book
        )
      );
      setEditId(null);
    } else {
      setBooks((prev) => [...prev, { id: uuidv4(), title, author }]);
    }

    setTitle("");
    setAuthor("");
  };

  const editBook = (id: string) => {
    const book = books.find((b) => b.id === id);
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setEditId(book.id);
    }
  };

  const deleteBook = (id: string) => {
    Alert.alert("Hapus Buku", "Yakin mau hapus buku ini?", [
      { text: "Batal", style: "cancel" },
      {
        text: "Hapus",
        style: "destructive",
        onPress: () => setBooks((prev) => prev.filter((b) => b.id !== id)),
      },
    ]);
  };

  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
  );

  const renderBook = ({
    item,
  }: {
    item: { id: string; title: string; author: string };
  }) => (
    <SwipeableItem
      key={item.id}
      item={item}
      overSwipe={50}
      snapPointsLeft={[50]}
      snapPointsRight={[100]}
      renderUnderlayRight={() => (
        <View style={styles.deleteUnderlay}>
          <IconButton
            icon="delete"
            iconColor="#fff"
            onPress={() => deleteBook(item.id)}
          />
        </View>
      )}
    >
      <Animated.View>
        <Card style={styles.card}>
          <Card.Title
            title={item.title}
            subtitle={item.author}
            right={() => (
              <View style={{ flexDirection: "row" }}>
                <IconButton icon="pencil" onPress={() => editBook(item.id)} />
              </View>
            )}
          />
        </Card>
      </Animated.View>
    </SwipeableItem>
  );

  return (
    <LinearGradient colors={["#89f7fe", "#66a6ff"]} style={styles.container}>
      <Text style={styles.title}>📚 Melibrary Book</Text>

      <TextInput
        label="Cari Buku"
        value={search}
        onChangeText={setSearch}
        style={styles.input}
        mode="outlined"
      />

      <TextInput
        label="Judul Buku"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Penulis"
        value={author}
        onChangeText={setAuthor}
        style={styles.input}
        mode="outlined"
      />
      <Button
        mode="contained"
        icon={editId ? "content-save-edit" : "plus"}
        onPress={addOrUpdateBook}
        style={styles.button}
      >
        {editId ? "Update Buku" : "Tambah Buku"}
      </Button>

      <FlatList
        data={filteredBooks}
        keyExtractor={(item) => item.id}
        renderItem={renderBook}
        ListEmptyComponent={
          <Text style={styles.empty}>Tidak ada buku ditemukan</Text>
        }
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 50,
  },
  input: {
    marginBottom: 8,
  },
  button: {
    marginBottom: 16,
    borderRadius: 8,
  },
  card: {
    marginBottom: 8,
    borderRadius: 12,
    overflow: "hidden",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#fff",
  },
  deleteUnderlay: {
    flex: 1,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 20,
    borderRadius: 12,
    marginBottom: 8,
  },
  empty: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#fff",
  },
});
