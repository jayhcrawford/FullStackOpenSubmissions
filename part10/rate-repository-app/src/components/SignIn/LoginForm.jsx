import React from "react";

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

// Validation Schema with Yup
const validationSchema = Yup.object().shape({
  username: Yup.string().required("Login is required"),
  password: Yup.string().required("Password is required"),
});

const sleep = ms => new Promise(r => setTimeout(r, ms))

export const LoginForm = ({
  login,
  reset,
  validated,
  loading,
  errorMessage,
  username,
  password,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
}) => {
  const handleSubmit = async (values) => {
    await sleep(50);
    onSubmit(values);
  };

  return (
    <View style={styles.container}>
      {!validated ? (
        <Formik
          initialValues={{ username, password }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
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
                    touched.username && errors.username && styles.errorInput,
                  ]}
                  placeholder="Username"
                  placeholderTextColor="grey"

                  onChangeText={(text) => {
                    handleChange("username")(text);
                    onUsernameChange(text);
                  }}
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
                    touched.password && errors.password && styles.errorInput,
                  ]}
                  placeholder="Password"
                  placeholderTextColor="grey"
                  secureTextEntry
                  onChangeText={(text) => {
                    handleChange("password")(text);
                    onPasswordChange(text);
                  }}
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
      ) : (
        <TouchableOpacity onPress={reset} style={styles.button}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export const marginSide = 20;

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
