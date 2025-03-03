import React, { useState, useContext } from "react";
import { AuthState } from "../../contexts/Context_AuthProvider";
import useLogin from "../../hooks/useLogIn";
import * as Yup from "yup";

import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { Formik } from "formik";
import { theme } from "../../../theme";
import { LoginFormC } from "./LoginFormC";


const LoginFormContainer = () => {
  const { dispatch, state } = useContext(AuthState);
  const { login } = useLogin(dispatch);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (values) => {
    const credentials = {
      username: values.username,
      password: values.password,
    };
    try {
      login(credentials);
    } catch (error) {
      console.error("Error calling login from SignIn.jsx", error);
    }
  };

  const reset = async () => {
    try {
      await dispatch({ type: "reset" });
    } catch (error) {
      console.error("Error resetting state", error);
    }
  };

  return (
    <LoginFormC
      login={login}
      reset={reset}
      validated={state.validated}
      loading={state.loading}
      errorMessage={state.errorMessage}
      username={username}
      password={password}
      onUsernameChange={setUsername}
      onPasswordChange={setPassword}
      onSubmit={onSubmit}
    />
  );
};

const marginSide = 20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
    margin: marginSide,
    marginTop: 0,
    fontFamily: theme.fonts.fontSelection,
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
    marginLeft: marginSide,
  },
  button: {
    backgroundColor: "#2668cd",
    marginLeft: marginSide,
    marginRight: marginSide,
    marginTop: 15,
    borderRadius: 4,
    padding: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
    fontFamily: theme.fonts.fontSelection,
  },
});

export default LoginFormContainer;
