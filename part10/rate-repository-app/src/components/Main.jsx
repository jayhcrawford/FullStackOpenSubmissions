import RepositoryList from "./RepositoryList/RepositoryList";
import AppBar from "./AppBar";

import { Route, Routes, Navigate } from "react-router-native";
import { FETCH_ME } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { AuthState } from "../contexts/Context_AuthProvider";
import AuthStorage from "../utils/authStorage";
import LoginFormContainer from "./SignIn/LoginFormContainer";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Linking } from "expo-linking";
import RepositoryDetails from "./RepositoryDetails";
import { SignUpForm } from "./SignUp/SignUp";
import SignUpFormContainer from "./SignUp/SignUpFormContainer";
import ReviewFormContainer from "./ReviewForm/ReviewFormContainer";

import { PaperProvider } from "react-native-paper";
import MyReviews from "./MyReviews/MyReviews";

const Stack = createStackNavigator();

const linking = {
  prefixes: ["myapp://"],
  config: {
    screens: {
      ItemDetail: "item/:id",
    },
  },
};

const tokenPresent = (dispatch) => {
  //if the user was logged in before they booted the app, fetch their data and log them in
  const authChecker = new AuthStorage();
  const fetchLocalToken = async () => {
    const token = await authChecker.getAccessToken();
    if (token && token != []) {
      dispatch({ type: "login", payload: token });
    }
  };
  fetchLocalToken();
};

const Main = (props) => {
  const [user, setUser] = useState(null);
  const { state, dispatch } = useContext(AuthState);

  const { loading, error, data, refetch } = useQuery(FETCH_ME, {
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    //if the user's token is already in storage
    tokenPresent(dispatch);
  }, [user]);

  useEffect(() => {
    //every time the FETCH_ME query gets called, store the data in state
    setUser(data);
  }, [data]);

  useEffect(() => {
    //refetch everytime the store changes
    refetch();
  }, [state]);

  return (
    <>
      <AppBar />
      <Routes>
        <Route path="/" element={<Repositories />} />
        <Route path="/SignIn" element={<LoginFormContainer />} />
        <Route path="/SignUp" element={<SignUpFormContainer />} />
        <Route path="/Review" element={<ReviewFormContainer />} />
        <Route path="/MyReviews" element={<MyReviews/>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

const Repositories = () => {
  return (

      <NavigationContainer linking={linking}>
        <Stack.Navigator
          initialRouteName="Repository List"
          screenOptions={{
            headerBackTitle: "Back",
            headerTitle: "",
            headerStyle: {
              height: 60,
            },
          }}
        >
          <Stack.Screen
            name="Repository List"
            component={RepositoryList}
            options={{ title: "Repository List", headerShown: false }}
          />
          <Stack.Screen
            name="Repository Details"
            component={RepositoryDetails}
          />
        </Stack.Navigator>
      </NavigationContainer>

  );
};

export default Main;
