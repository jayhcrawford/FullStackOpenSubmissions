import { useContext, useEffect, useReducer, useState } from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native";
import { useFormik } from "formik";

import * as yup from "yup";
import { theme } from "../../theme";
import useLogin from "../hooks/useLogIn";
import { AuthDispatch, AuthState } from "../contexts/Context_AuthProvider";

const validationSchema = yup.object().shape({
  username: yup.string().required("username is required"),
  password: yup.string().required("password is required"),
});

const initialValues = {
  username: "",
  password: "",
};

const SignIn = (props) => {
  const [inputStyle, setInputStyle] = useState(styles.input);
  const { dispatch, state } = useContext(AuthState);

  const { login, data, loading, errorMessage } = useLogin(dispatch);

  const onSubmit = async (values) => {
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

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const validateInput = () => {
    if (formik.values.password == "" || formik.values.username == "") {
      setInputStyle(styles.input_error);
    }

    formik.handleSubmit();
  };

  const reset = async () => {
    try {
      await dispatch({ type: "reset" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <>
          {!state.validated ? (
            <>
              <Text style={styles.text}>Username</Text>
              {formik.touched.username && formik.errors.username && (
                <Text style={{ color: "red", marginLeft: marginSide }}>
                  {formik.errors.username}
                </Text>
              )}
              <TextInput
                error={() => console.log("error")}
                style={inputStyle}
                onChangeText={formik.handleChange("username")}
                value={formik.values.username}
                placeholder="Username"
              ></TextInput>
              <Text style={styles.text}>Password</Text>
              {formik.touched.password && formik.errors.password && (
                <Text style={{ color: "red", marginLeft: marginSide }}>
                  {formik.errors.password}
                </Text>
              )}
              <TextInput
                error={() => console.log("error")}
                secureTextEntry={true}
                style={inputStyle}
                onChangeText={formik.handleChange("password")}
                value={formik.values.password}
                placeholder="Password"
              ></TextInput>
              <TouchableOpacity onPress={validateInput} style={styles.button}>
                <Text style={styles.buttonText}>Log In</Text>
              </TouchableOpacity>
            </>
          ) : null}
        </>

        {state.validated ? (
          <>
            <TouchableOpacity onPress={reset} style={styles.button}>
              <Text style={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>
          </>
        ) : null}
      </View>
    </>
  );
};

const marginSide = 20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
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
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    margin: marginSide,
    marginTop: 0,
    fontFamily: theme.fonts.fontSelection,
  },
  input_error: {
    height: 40,
    borderColor: "red",
    borderWidth: 3,
    marginBottom: 10,
    paddingHorizontal: 10,
    margin: marginSide,
    marginTop: 0,
  },
  text: {
    fontSize: 16,
    marginLeft: marginSide,
    marginBottom: 0,
    marginTop: marginSide,
    fontFamily: theme.fonts.fontSelection,
  },
});

export default SignIn;
