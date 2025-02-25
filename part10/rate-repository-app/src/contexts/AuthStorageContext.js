import { createContext } from "react";
import AuthStorage from "../utils/authStorage";

const AuthStorageContext = createContext();
const authStorage = new AuthStorage();

const state = { token: "" };

console.log(state, "initial State");

export async function reducer(state, action) {
  switch (action.type) {
    case "login": {
      const result = await authStorage.setAccessToken(action.payload);
      return {
        token: result,
      };
    }
    case "reset": {
      const result = await authStorage.removeAccessToken();
      return { token: "" };
    }
    case "getUser": {
      const result = await authStorage.getAccessToken();
      return { token: state.token };
    }
  }
  throw Error("Unknown action: " + action.type);
}

export default AuthStorageContext;
