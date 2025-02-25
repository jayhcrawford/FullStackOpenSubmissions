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

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);


  useEffect(() => {
    if (!loggedIn) {
      if (authStorage.getAccessToken() != undefined) {
        setLoggedIn(true);
      }
    } else if (loggedIn && authStorage.getAccessToken() == undefined) {
      setLoggedIn(false);
    }
  }, []);

  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <AuthStorageContext.Provider value={authStorage}>
          <Main loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        </AuthStorageContext.Provider>
      </ApolloProvider>
    </NativeRouter>
  );
};

export default App;
