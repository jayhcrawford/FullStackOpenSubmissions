import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { RespositoryItem } from "../RespositoryItem";
import { theme } from "../../../theme";
import useRepositories from "../../hooks/useRepositories";

const repositories = {
  totalCount: 8,
  pageInfo: {
    hasNextPage: true,
    endCursor: "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
    startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
  },
  edges: [
    {
      node: {
        id: "jaredpalmer.formik",
        fullName: "jaredpalmer/formik",
        description: "Build forms in React, without the tears",
        language: "TypeScript",
        forksCount: 1619,
        stargazersCount: 21856,
        ratingAverage: 88,
        reviewCount: 3,
        ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/4060187?v=4",
      },
      cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
    },
    {
      node: {
        id: "async-library.react-async",
        fullName: "async-library/react-async",
        description: "Flexible promise-based React data loader",
        language: "JavaScript",
        forksCount: 69,
        stargazersCount: 1760,
        ratingAverage: 72,
        reviewCount: 3,
        ownerAvatarUrl: "https://avatars1.githubusercontent.com/u/54310907?v=4",
      },
      cursor: "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
    },
  ],
};

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

const RepositoryList = () => {
  const { data, error, loading } = useRepositories();

  return <>{data && <RenderRepositoryList data={data.repositories} />}</>;
};

export const RenderRepositoryList = ({ data }) => {
  const repositoryNodes = data ? data.edges.map((edge) => edge.node) : [];

  return (
    <>
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
