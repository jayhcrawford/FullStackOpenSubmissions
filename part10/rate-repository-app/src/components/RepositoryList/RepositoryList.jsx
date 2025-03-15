import React, { useState } from "react";
import { FlatList, View, StyleSheet, Text } from "react-native";
import { RespositoryItem } from "../RespositoryItem";
import { theme } from "../../../theme";
import useRepositories from "../../hooks/useRepositories";

import { Button, Menu, Divider, useTheme } from "react-native-paper";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";

import { Searchbar } from "react-native-paper";

const extend_paper_theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    elevation: {
      level3: "white",
    },
  },
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

export const FilterPicker = (props) => {
  const [selection, setSelection] = useState(null);

  // const theme = useTheme();

  const openMenu = () => props.setVisible(true);

  const closeMenu = () => props.setVisible(false);

  const selectAndClose = (selection) => {
    setSelection(selection);
    closeMenu();
  };

  return (
    <PaperProvider style={extend_paper_theme}>
      <View
        style={{
          paddingTop: 0,
          flexDirection: "row",
          justifyContent: "left",
          paddingLeft: 25,
          // color: extend_paper_theme.colors.myOwnColor
        }}
      >
        <Menu
          visible={props.visible}
          onDismiss={closeMenu}
          anchor={
            <Button textColor="black" onPress={openMenu}>
              {selection ? "filter by: " + selection : "filter"}
            </Button>
          }
        >
          <Menu.Item onPress={() => selectAndClose("Item 1")} title="Item 1" />
          <Menu.Item onPress={() => selectAndClose("Item 2")} title="Item 2" />
          <Divider />
          <Menu.Item onPress={() => selectAndClose("Item 3")} title="Item 3" />
        </Menu>
      </View>
    </PaperProvider>
  );
};

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <Searchbar
      theme={{ colors: { elevation: { level3: "#F1F1F1" } } }}
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery}
    />
  );
};

export const RenderRepositoryList = ({ data, navigation }) => {
  const repositoryNodes = data ? data.edges.map((edge) => edge.node) : [];

  const [visible, setVisible] = useState(false);

  return (
    <>
      <View style={styles.main}>
        <View style={{ margin: 10 }}>
          <SearchInput />
        </View>
        {repositoryNodes ? (
          <>
            <View style={{ height: 45, zIndex: 100 }}>
              <FilterPicker visible={visible} setVisible={setVisible} />
            </View>
            <FlatList
              style={{height: 580}}
              data={repositoryNodes}
              ItemSeparatorComponent={ItemSeparator}
              renderItem={({ item }) => (
                <RespositoryItem navigation={navigation} item={item} />
              )}
            />
          </>
        ) : null}
      </View>
    </>
  );
};

export default RepositoryList;
