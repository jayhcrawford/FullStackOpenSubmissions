import { useMutation } from "@apollo/client";
import { useState } from "react";
import { SIGN_IN } from "../graphql/mutations";

const useLogin = (dispatch) => {
  const [errorMessage, setErrorMessage] = useState(null);

  const [loginMutation, { data, loading, error }] = useMutation(SIGN_IN, {
    onCompleted: async (data) => {
      dispatch({ type: "login", payload: await data.authenticate.accessToken });
    },
    onError: (_error) => {
      console.log(_error, "is the reason the login failed");
    },
  });

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
