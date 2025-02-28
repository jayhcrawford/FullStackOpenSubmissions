import { createContext, useReducer, useState } from "react";
import AuthStorage from "../utils/authStorage";

export const AuthState = createContext(null);
export const AuthDispatch = createContext({});

const authStorage = new AuthStorage();

const initialState = {
  authToken: "",
  validated: false,
};

const reducer = async (state, action) => {
  if ((await action.type) == "login") {
    console.log("(FROM: reducer) login reducer reached");

    console.log("(FROM: reducer) is the initialState", initialState);

    console.log("(FROM: reducer) is the state", state);
    console.log("(FROM: reducer) is the action", action);

    console.log("(FROM: reducer) is the payload: ", action.payload);

    try {
      await authStorage.setAccessToken(action.payload);
    } catch (error) {
      console.log(error);
    }

    return (state = { authToken: action.payload });
  }
  if ((await action.type) == "reset") {
    try {
      await authStorage.removeAccessToken();
    } catch (error) {
      console.log(error);
    }
    console.log("(FROM: reducer; reset) a reset occured");
    return (state = { authToken: "" });
  }
  if ((await action.type) == "getUser") {
    try {
      const tokenInStorage = await authStorage.getAccessToken();

      console.log(state, "is the state in the getUser slice");
      console.log(action, "is the action in the getUser slice");

      return state;
    } catch (error) {
      console.log(error);
    }

    return state;
  }
  throw Error("Unknown action: " + action.type);
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthState.Provider value={state}>
      <AuthDispatch.Provider value={dispatch}>{children}</AuthDispatch.Provider>
    </AuthState.Provider>
  );
};

export default AuthProvider;
