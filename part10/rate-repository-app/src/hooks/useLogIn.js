import { useMutation } from "@apollo/client";
import { useState } from "react";
import { SIGN_IN } from "../graphql/mutations";

const useLogin = (dispatch) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [caughtToken, setCaughtToken] = useState("");

  const [loginMutation, { data, loading, error }] = useMutation(SIGN_IN, {
    onCompleted: (data) => {
      console.log("(FROM: useLogin.js) the mutation was completed");
      console.log("(FROM: useLogin.js) the mutation response is: ", data);
      console.log("(FROM: useLogin.js) the caughtToken will be set as: ", data.authenticate.accessToken);

      setCaughtToken(data.authenticate.accessToken);
    },
    onError: (_error) => {
      console.log(_error, "is the reason the login failed");
    },
  });

  const login = async (credentials) => {
    try {
      //to query graphql

      console.log(
        "(FROM useLogin.js) the login credentials in the useLogIn hook are: ",
        credentials
      );

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
    caughtToken,
    loading,
    error,
    errorMessage,
  };
};

export default useLogin;
