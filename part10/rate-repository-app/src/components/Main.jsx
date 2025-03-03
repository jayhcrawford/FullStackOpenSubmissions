import RepositoryList, { RenderRepositoryList } from "./RepositoryList/RepositoryList";
import AppBar from "./AppBar";

import { Route, Routes, Navigate } from "react-router-native";
import SignIn from "./SignIn/SignIn";
import { FETCH_ME } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { AuthDispatch, AuthState } from "../contexts/Context_AuthProvider";
import { Button } from "react-native";
import AuthStorage from "../utils/authStorage";
import LoginForm from "./SignIn/LoginForm";
import LoginFormContainer from "./SignIn/LoginFormCGPT";

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
        <Route path="/" element={<RepositoryList />} />
        <Route path="/SignIn" element={<LoginFormContainer />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default Main;
