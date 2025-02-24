import { createContext } from "react";

const AuthStorageContext = createContext();

export const initialState = { token: "" };

export function reducer(state, action) {
  switch (action.type) {
    case "login": {
      return {
        token: action.payload,
      };
    }
  }
  throw Error("Unknown action: " + action.type);
}

export default AuthStorageContext;
