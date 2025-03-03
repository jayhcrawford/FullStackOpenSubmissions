import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { RespositoryItem } from "../RespositoryItem";
import { theme } from "../../../theme";
import useRepositories from "../../hooks/useRepositories";
import { printIntrospectionSchema } from "graphql";

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

export const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = ({ navigation }) => {
  const { data, error, loading } = useRepositories();

  return (
    <>
      {data && (
        <RenderRepositoryList
          navigation={navigation}
          data={data.repositories}
        />
      )}
    </>
  );
};

export const RenderRepositoryList = ({ data, navigation }) => {
  const repositoryNodes = data ? data.edges.map((edge) => edge.node) : [];

  return (
    <>
      <View style={styles.main}>
        {repositoryNodes ? (
          <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => (
              <RespositoryItem navigation={navigation} item={item} />
            )}
          />
        ) : null}
      </View>
    </>
  );
};

export default RepositoryList;
