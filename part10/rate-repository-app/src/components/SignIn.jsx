import { useFormik } from "formik";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Button, Pressable } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native";

const initialValues = {
  username: "",
  password: "",
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>Username</Text>
        <TextInput
          style={styles.input}
          onChangeText={formik.handleChange("username")}
          value={formik.values.username}
          placeholder="Username"
        ></TextInput>
        <Text style={styles.text}>Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          onChangeText={formik.handleChange("password")}
          value={formik.values.password}
          placeholder="Password"
        ></TextInput>

        <TouchableOpacity onPress={formik.handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
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
    padding: 5
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
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
  },
});

export default SignIn;
