import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import Constants from "expo-constants";
import { Text } from "react-native";
import { useEffect, useState } from "react";
import { theme } from "../../theme";
import { Link } from "react-router-native";
import AuthStorage from "../utils/authStorage";

const fontSelection = theme.fonts.fontSelection;

const authStorage = new AuthStorage();

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    backgroundColor: theme.colors.headerBackground,
    flexDirection: "row",
  },
  tab: {
    color: theme.colors.color,
    fontSize: 24,
    padding: 10,
    fontFamily: fontSelection,
  },
});


const AppBar = (props) => {

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text style={styles.tab}>Respositories</Text>
        </Link>

        <Link to="/SignIn">
          <Text style={styles.tab}>{!props.loggedIn ? "Sign In" : "Sign Out"}</Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
