import { View, StyleSheet, Pressable } from "react-native";
import Constants from "expo-constants";
import { Text } from "react-native";
import { useState } from "react";
import { AppBarTab } from "./AppBarTab";
import { theme } from "../../theme";


const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    backgroundColor: theme.colors.headerBackground,
  },
  header: {
    color: theme.colors.color,
    fontSize: 32,
    padding: 10,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab text="Respositories" style={styles.header}/>
    </View>
  );
};

export default AppBar;
