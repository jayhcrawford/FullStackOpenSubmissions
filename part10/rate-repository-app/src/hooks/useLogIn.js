import { ApolloClient, useMutation } from "@apollo/client";
import { useContext, useReducer, useState } from "react";
import { SIGN_IN } from "../graphql/mutations";

import {
  initialState,
  reducer,
} from "../contexts/AuthStorageContext";

const useLogin = (setter) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [tokenInState, setTokenInState] = useState("");

  const [loginMutation, { data, loading, error }] = useMutation(SIGN_IN, {
    onCompleted: (data) => {
      dispatch({
        payload: data.authenticate.accessToken,
        type: "login",
      });

      setter(true);
    },
    onError: (_error) => {
      console.log(_error, "is the reason the login failed");
    },
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const login = async (credentials) => {
    try {
      //to query graphql

      setErrorMessage(null); // Reset any previous errors

      await loginMutation({
        variables: credentials,
      });
    } catch (err) {
      setErrorMessage("Login failed. Please check your credentials.");
    }
  };

  return {
    login,
    data,
    loading,
    error,
    errorMessage,
  };
};

export default useLogin;
