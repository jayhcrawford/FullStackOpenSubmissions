import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { theme } from "../../../theme";
import useLogin from "../../hooks/useLogIn";
import { AuthState } from "../../contexts/Context_AuthProvider";

// Validation Schema with Yup
const validationSchema = Yup.object().shape({
  username: Yup.string().required("Login is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm = () => {
  const { dispatch, state } = useContext(AuthState);

  const { login, data, loading, errorMessage } = useLogin(dispatch);

  const onSubmit = async (values) => {
    console.log(values);

    const credentials = {
      password: values.password,
      username: values.username,
    };

    try {
      login(credentials);
    } catch (error) {
      console.log("error calling login (hook) from SignIn.jsx");
    }
  };

  const reset = async () => {
    try {
      await dispatch({ type: "reset" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {!state.validated ? (
        <>
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              touched,
              errors,
            }) => (
              <>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[
                      styles.input,
                      touched.username && errors.username
                        ? styles.errorInput
                        : null,
                    ]}
                    placeholder="Username"
                    onChangeText={handleChange("username")}
                    onBlur={handleBlur("username")}
                    value={values.username}
                  />
                  {touched.username && errors.username && (
                    <Text style={styles.errorText}>{errors.username}</Text>
                  )}
                </View>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={[
                      styles.input,
                      touched.password && errors.password
                        ? styles.errorInput
                        : null,
                    ]}
                    placeholder="Password"
                    secureTextEntry
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                  />
                  {touched.password && errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                </View>

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </>
      ) : null}
      {state.validated ? (
        <>
          <TouchableOpacity onPress={reset} style={styles.button}>
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
        </>
      ) : null}
    </View>
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

export default LoginForm;
