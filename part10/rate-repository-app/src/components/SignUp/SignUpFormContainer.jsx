import React, { useState, useContext } from "react";
import { AuthState } from "../../contexts/Context_AuthProvider";
import useLogin from "../../hooks/useLogIn";
import { LoginForm } from "../SignIn/LoginForm";
import { SignUpForm } from "./SignUp";

const SignUpFormContainer = () => {
  // const { dispatch, state } = useContext(AuthState);
  // const { login } = useLogin(dispatch);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const onSubmit = async (values) => {
    const credentials = {
      username: values.username,
      password: values.password,
    };

    console.log(credentials)
    // try {
    //   login(credentials);
    // } catch (error) {
    //   console.error("Error calling login from SignIn.jsx", error);
    // }
  };

  const reset = async () => {
    try {
      await dispatch({ type: "reset" });
    } catch (error) {
      console.error("Error resetting state", error);
    }
  };

  return (
    <SignUpForm
      // login={login}
      reset={reset}
      // validated={state.validated}
      // loading={state.loading}
      // errorMessage={state.errorMessage}
      username={username}
      password={password}
      password2={password2}
      onUsernameChange={setUsername}
      onPasswordChange={setPassword}
      onPassword2Change={setPassword2}
      onSubmit={onSubmit}
    />
  );
};

export default SignUpFormContainer;
