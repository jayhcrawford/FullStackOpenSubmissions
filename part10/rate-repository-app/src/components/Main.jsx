import Constants from "expo-constants";
import { Text, StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import { theme } from "../../theme";

import { Route, Routes, Navigate } from 'react-router-native';
import SignIn from "./SignIn";
import { useQuery } from "@apollo/client";
import { FETCH_ME } from "../graphql/queries";
import { useContext } from "react";
import AuthStorageContext from "../contexts/AuthStorageContext";

const Main = (props) => {

  return (
    <>
      <AppBar loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn}/>
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/SignIn" element={<SignIn loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn} setReset={props.setReset}/>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default Main;
