import Constants from "expo-constants";
import { Text, StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import { theme } from "../../theme";

import { Route, Routes, Navigate } from 'react-router-native';
import SignIn from "./SignIn";

const Main = (props) => {
  return (
    <>
      <AppBar loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn}/>
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/SignIn" element={<SignIn loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn}/>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default Main;
