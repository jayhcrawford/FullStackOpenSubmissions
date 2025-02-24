import { ApolloClient, useMutation } from "@apollo/client";
import { useReducer, useState } from "react";
import { SIGN_IN } from "../graphql/mutations";

import { initialState, reducer } from "../contexts/AuthStorageContext";
import { apolloClient } from "../../App";

const useLogin = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loginMutation, { data, loading, error }] = useMutation(SIGN_IN);

  const [errorMessage, setErrorMessage] = useState(null);

  const login = async (credentials) => {
    try {
      setErrorMessage(null); // Reset any previous errors

      const result = await loginMutation({
        variables: credentials,
      });

      console.log("the result in SignIn: ", result);
      dispatch({
        payload: result.data.authenticate.accessToken,
        type: "login",
      });

      apolloClient.resetStore();

      if (response.data.login.token) {
        // You can save the token or user data as per your app needs (e.g., in localStorage or context)

        console.log(response.data.login.token);
        // You can also return the user data if needed
        return response.data.login.user;
      }
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
