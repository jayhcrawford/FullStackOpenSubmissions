import { createContext } from "react";
import AuthStorage from "../utils/authStorage";

const AuthStorageContext = createContext();
const authStorage = new AuthStorage();

export const initialState = { token: "" };

console.log(initialState, "initial State")

export function reducer(state, action) {
  switch (action.type) {
    case "login": {
      authStorage.setAccessToken(action.payload);
      return {
        token: action.payload,
      };
    }
  }
  throw Error("Unknown action: " + action.type);
}

export default AuthStorageContext;
