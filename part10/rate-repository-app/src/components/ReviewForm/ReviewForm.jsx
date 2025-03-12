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
  repoOwner: Yup.string().required("Owner name is required"),
  repoName: Yup.string().required("Repository name is required"),
  repoRating: Yup.number().min(0).max(100).required("Rating betweeon 0 and 100 is required"),
  repoReview: Yup.string(),
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const ReviewForm = ({
  login,
  reset,
  validated,
  loading,
  errorMessage,

  repoOwner,
  repoName,
  repoRating,
  repoReview,

  onRepoOwnerChange,
  onRepoNameChange,
  onRepoRatingChange,
  onRepoReviewChange,

  onSubmit,
}) => {
  const handleSubmit = async (values) => {
    await sleep(50);
    onSubmit(values);
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ repoOwner, repoName, repoRating, repoReview }}
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
                  touched.repoOwner && errors.repoOwner && styles.errorInput,
                ]}
                placeholder="Repository Owner"
                placeholderTextColor="grey"
                onChangeText={(text) => {
                  handleChange("repoOwner")(text);
                  onRepoOwnerChange(text);
                }}
                onBlur={handleBlur("repoOwner")}
                value={values.repoOwner}
              />
              {touched.repoOwner && errors.repoOwner && (
                <Text style={styles.errorText}>{errors.repoOwner}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={[
                  styles.input,
                  touched.repoName && errors.repoName && styles.errorInput,
                ]}
                placeholder="Repository Name"
                placeholderTextColor="grey"
                onChangeText={(text) => {
                  handleChange("repoName")(text);
                  onRepoNameChange(text);
                }}
                onBlur={handleBlur("repoName")}
                value={values.repoName}
              />
              {touched.repoName && errors.repoName && (
                <Text style={styles.errorText}>{errors.repoName}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={[
                  styles.input,
                  touched.repoRating && errors.repoRating && styles.errorInput,
                ]}
                placeholder="Rating in between 0 and 100"
                placeholderTextColor="grey"
                onChangeText={(text) => {
                  handleChange("repoRating")(text);
                  onRepoRatingChange(text);
                }}
                onBlur={handleBlur("repoRating")}
                value={values.repoRating}
              />
              {touched.repoRating && errors.repoRating && (
                <Text style={styles.errorText}>{errors.repoRating}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={[
                  styles.input,
                  touched.repoReview && errors.repoReview && styles.errorInput,
                ]}
                placeholder="Review"
                placeholderTextColor="grey"
                onChangeText={(text) => {
                  handleChange("repoReview")(text);
                  onRepoReviewChange(text);
                }}
                onBlur={handleBlur("repoReview")}
                value={values.repoReview}
              />
              {touched.repoReview && errors.repoReview && (
                <Text style={styles.errorText}>{errors.repoReview}</Text>
              )}
            </View>

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
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
