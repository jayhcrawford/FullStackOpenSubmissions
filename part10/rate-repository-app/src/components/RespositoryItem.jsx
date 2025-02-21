import React from "react";
import { View, FlatList, StyleSheet, Text, StatusBar } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#F1F1F1",
    padding: 20,
    marginVertical: 1,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    color: "black",
  },
  body: {
    fontsize: 14,
    color: "black",
  },
});

export const RespositoryItem = ({ item }) => (
  <View style={styles.item}>
    <Text style={styles.body}>Full name: {item.id.replace(/\./g, "/")}</Text>
    <Text style={styles.body}>Description: {item.description}</Text>
    <Text style={styles.body}>Language: {item.language}</Text>
    <Text style={styles.body}>Stars: {item.stargazersCount}</Text>
    <Text style={styles.body}>Forks: {item.forksCount}</Text>
    <Text style={styles.body}>Reviews: {item.reviewCount}</Text>
    <Text style={styles.body}>Ratings: {item.ratingAverage}</Text>

  </View>
);
