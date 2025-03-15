
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  Linking,
} from "react-native";

import { theme } from "../../../theme";
import { ItemSeparator } from "../RepositoryList/RepositoryList";

import { formatDateString } from "../RepositoryDetails";
import { ReviewListItem } from "../RepositoryDetails";

const MyReviews = () => {
  const [repoData, setRepoData] = useState(null);

  if (!repoData) {
    return (
      <View style={{ backgroundColor: "white", height: "100%" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.main}>
      {repoData.repository.reviews.edges ? (
        <FlatList
          style={styles.list}
          data={repoData.repository.reviews.edges}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => <ReviewListItem item={item} />}
        />
      ) : null}
    </View>
  );
};

const circleSize = 30;

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  list: {
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "#F1F1F1",
    marginTop: 20,
    height: 380,
  },
  listItem: {
    padding: 5,
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
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
  bold: {
    fontWeight: "bold",
  },
  scoreStyle: {
    borderWidth: 2,
    height: circleSize,
    width: circleSize,
    borderRadius: circleSize / 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  top_container: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
  },

  top_of_review_rating: {
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
  },
  top_of_review_text: {
    alignSelf: "flex-end",
  },
  gitButton: {
    backgroundColor: "#2668cd",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
    borderRadius: 4,
    padding: 5,
  },
  gitButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
    fontFamily: theme.fonts.fontSelection,
  },
});

export default MyReviews;
