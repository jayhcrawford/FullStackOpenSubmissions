import Main from "./src/components/Main";
import { NativeRouter } from "react-router-native";
import { ApolloProvider } from "@apollo/client";
import createApolloClient from "./src/utils/apolloClient";
import AuthStorageContext from "./src/contexts/AuthStorageContext";

import AuthStorage from "./src/utils/authStorage";
import { Button } from "react-native-web";
import { useEffect, useState } from "react";

const authStorage = new AuthStorage();
export const apolloClient = createApolloClient(authStorage);

const acquireToken = async () => {
  const result = await authStorage.getAccessToken();
  console.log("in acquire token: ", '\n','\n','\n','\n','\n', result);
  return result;
};

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState("");

  useEffect(() => {
    if (!loggedIn) {
      const getToken = async () => {
        const result = await acquireToken();
        return result;
      }

      const token = getToken();
      setUserToken(token);
      setLoggedIn(true);
    }
    if (loggedIn && userToken == "") {
      setLoggedIn(false);
    }
  }, [loggedIn, userToken]);

  console.log(userToken, "is the token");

  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <AuthStorageContext.Provider value={authStorage}>
          <Main />
        </AuthStorageContext.Provider>
      </ApolloProvider>
    </NativeRouter>
  );
};

export default App;
