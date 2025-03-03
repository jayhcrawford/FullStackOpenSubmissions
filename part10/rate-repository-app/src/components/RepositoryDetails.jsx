// ItemDetailScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Button, Linking } from "react-native";
import { useQuery } from "@apollo/client";
import { FETCH_REPO } from "../graphql/queries";
import { RespositoryItem } from "./RespositoryItem";
import { theme } from "../../theme";
import { ItemSeparator } from "./RepositoryList/RepositoryList";
import { TouchableOpacity } from "react-native";

function formatDateString(dateString) {
  const date = new Date(dateString);

  // Array of month names
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get the month, day, and year from the Date object
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  // Function to get the suffix (st, nd, rd, th)
  function getDaySuffix(day) {
    if (day > 3 && day < 21) return "th"; // Handle 11th to 20th
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  // Get the suffix for the day
  const dayWithSuffix = day + getDaySuffix(day);

  // Return the formatted date string
  return `${month} ${dayWithSuffix} ${year}`;
}

const ReviewListItem = ({ item }) => {
  return (
    <View style={[styles.main, styles.listItem]}>
      <View style={styles.top_container}>
        <View style={[styles.top_of_review_rating]}>
          <View style={styles.scoreStyle}>
            <Text>{item.node.rating}</Text>
          </View>
        </View>
        <View style={styles.top_of_review_text}>
          <Text style={styles.bold}>{item.node.user.username}</Text>
          <Text>{formatDateString(item.node.createdAt)}</Text>
        </View>
      </View>
      <Text>{item.node.text}</Text>
    </View>
  );
};

const RepositoryDetails = ({ navigation, route }) => {
  const [repoData, setRepoData] = useState(null);

  const repoId = route.params.id;

  const { data, error, loading } = useQuery(FETCH_REPO, {
    variables: {
      repositoryId: repoId,
    },
  });

  useEffect(() => {
    setRepoData(data);
  }, [data]);

  if (!repoData) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.main}>
      <RespositoryItem item={repoData.repository} />

      <TouchableOpacity
        onPress={() => Linking.openURL(repoData.repository.url)}
        style={styles.gitButton}
      >
        <Text style={styles.gitButtonText}>On Github</Text>
      </TouchableOpacity>

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
    height: 350,
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

export default RepositoryDetails;
