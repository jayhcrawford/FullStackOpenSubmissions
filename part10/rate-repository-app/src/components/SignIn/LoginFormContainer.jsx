import React, { useState, useContext } from "react";
import { AuthState } from "../../contexts/Context_AuthProvider";
import useLogin from "../../hooks/useLogIn";
import { LoginForm } from "./LoginForm";


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
    <LoginForm
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

export default LoginFormContainer;
