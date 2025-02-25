import React, { useEffect, useState } from "react";
import { FlatList, View, StyleSheet, Text, NativeModules, DevSettings } from "react-native";
import { RespositoryItem } from "./RespositoryItem";
import { theme } from "../../theme";
import useRepositories from "../hooks/useRepositories";
import { useQuery } from "@apollo/client";
import { FETCH_REPOS } from "../graphql/queries";
import { TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  main: {
    backgroundColor: "white",
    fontFamily: theme.fonts.fontSelection,
  },
  resetButton: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "white",
    padding: 20,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { data, error, loading } = useRepositories();

  const repositoryNodes = data
    ? data.repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <>
{/*     
      RESET BUTTON FOR WORKING IN DEV
<TouchableOpacity
        onPress={() => DevSettings.reload()}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity> */}
      <View style={styles.main}>
        {repositoryNodes ? (
          <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => <RespositoryItem item={item} />}
          />
        ) : null}
      </View>
    </>
  );
};

export default RepositoryList;
