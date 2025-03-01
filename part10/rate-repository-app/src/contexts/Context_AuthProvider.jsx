import { createContext, useReducer, useState } from "react";
import AuthStorage from "../utils/authStorage";
import { apolloClient } from "../../ApolloConfig";

export const AuthState = createContext(initialState);
export const AuthDispatch = createContext(null);

const authStorage = new AuthStorage();

const initialState = {
  authToken: "",
  validated: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "login": {
      try {
        authStorage.setAccessToken(action.payload);
        return {
          validated: true,
          authToken: action.payload,
        };
      } catch (error) {
        console.log(error);
      }
      return {
        ...state,
        authToken: "there was an error fetching the token from local storage",
      };
    }

    case "reset": {
      try {
        authStorage.removeAccessToken().then(apolloClient.resetStore());
      } catch (error) {
        console.log(error);
      }
      
      return initialState;
    }
    default:
      throw Error("Unknown action: " + action.type);
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthState.Provider value={{ state, dispatch }}>
      {children}
    </AuthState.Provider>
  );
};

export default AuthProvider;
