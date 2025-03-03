import React from "react";
import { Pressable, TouchableOpacity } from "react-native";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image,
} from "react-native";
import { theme } from "../../theme";

const largerFont = 20;

const returnWithKSuffix = (number) => {
  if (number >= 1000) {
    return Math.round(number / 100) / 10 + "k";
  } else {
    return number;
  }
};

const fontSlection = theme.fonts.fontSelection;

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
    fontSize: largerFont,
    fontWeight: "bold",
    color: "black",
    fontFamily: fontSlection,
  },
  body: {
    color: "black",
    fontFamily: fontSlection,
  },
  tinyLogo: {
    width: 60,
    height: 60,
    marginTop: 6,
  },
  top: {
    flexDirection: "row",
    fontFamily: fontSlection,
  },
  language: {
    backgroundColor: "rgb(24, 119, 242)",
    color: "white",
    alignSelf: "flex-start",
    padding: 6,
    borderRadius: 5,
  },
  languageText: {
    color: "white",
    fontFamily: fontSlection,
  },
  description: {
    fontSize: largerFont,
    flex: 1,
    flexWrap: "wrap",
    fontFamily: fontSlection,
  },
  topSection: {
    marginLeft: 15,
    flexDirection: "column",
    flexShrink: 1,
  },
  details: {
    flexDirection: "row",
    marginTop: 20,
    fontFamily: fontSlection,
  },
  detailsComp: {
    flexGrow: 1,
    textAlign: "center",
  },
  boldDetails: {
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: fontSlection,
  },
  detailTitle: {
    textAlign: "center",
    color: "grey",
    fontFamily: fontSlection,
  },
});

const RepoDetail = ({ detailName, detailNum }) => {
  return (
    <View style={styles.detailsComp}>
      <Text style={styles.boldDetails}>{returnWithKSuffix(detailNum)}</Text>
      <Text style={styles.detailTitle}>{detailName}</Text>
    </View>
  );
};

export const RespositoryItem = ({ item, navigation }) => {


  const handlePress = (itemId) => {
    if (navigation) {
      navigation.navigate("Repository Details", { id: itemId });
    } else {
      //do nothing
    }
  };

  return (
    <Pressable onPress={() => handlePress(item.id)}>
      <View style={styles.item} testID="repo-item">
        <View
          style={
            styles.top
          } /* This contains repo image, title, description, language */
        >
          <Image
            style={styles.tinyLogo}
            source={{
              uri: item.ownerAvatarUrl,
            }}
          />
          <View
            style={
              styles.topSection
            } /* contains all of the text elements to the right of the image */
          >
            <Text style={styles.title}>{item.fullName}</Text>
            <Text style={styles.body}>{item.description}</Text>
            <TouchableOpacity style={styles.language}>
              <Text style={styles.languageText}>{item.language}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.details} /* bottom area */>
          <RepoDetail detailName={"Stars"} detailNum={item.stargazersCount} />
          <RepoDetail detailName={"Forks"} detailNum={item.forksCount} />
          <RepoDetail detailName={"Reviews"} detailNum={item.reviewCount} />
          <RepoDetail detailName={"Ratings"} detailNum={item.ratingAverage} />
        </View>
      </View>
    </Pressable>
  );
};
