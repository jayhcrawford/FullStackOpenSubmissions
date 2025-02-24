import React, { useEffect, useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { RespositoryItem } from "./RespositoryItem";
import { theme } from "../../theme";
import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  main: {
    backgroundColor: "white",
    fontFamily: theme.fonts.fontSelection,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories } = useRepositories();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <View style={styles.main}>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RespositoryItem item={item} />}
      />
    </View>
  );
};

export default RepositoryList;
