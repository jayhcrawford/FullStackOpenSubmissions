import Main from "./src/components/Main";
import { NativeRouter } from "react-router-native";
import { ApolloProvider, useQuery } from "@apollo/client";
import createApolloClient from "./src/utils/apolloClient";
import AuthStorageContext from "./src/contexts/AuthStorageContext";

import AuthStorage from "./src/utils/authStorage";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FETCH_ME } from "./src/graphql/queries";

const authStorage = new AuthStorage();
export const apolloClient = createApolloClient(authStorage);

const triggerRefetch = async () => {
  await apolloClient.reFetchObservableQueries();
};

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [reset, setReset] = useState("");
  const [storage, setStorage] = useState({});

  useEffect(() => {
    const getAllData = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const result = {};
        await Promise.all(
          keys.map(async (key) => {
            const value = await AsyncStorage.getItem(key);
            result[key] = value;
          })
        );
        setStorage(result);
      } catch (error) {
        console.error("Error getting data from AsyncStorage:", error);
      } 
    };

    if (!loggedIn) {
      getAllData();
    }

    if (!loggedIn && Object.hasOwn(storage, "auth:token")) {
      //verify that the user is logged in with a valid token here

      setLoggedIn(true);
      triggerRefetch();


    } else if (reset == "reset") {
      //this happens on logout
      
      authStorage.removeAccessToken();
      apolloClient.resetStore();
      setLoggedIn(false);
      setReset("");

      triggerRefetch();
    }
  }, [reset, loggedIn]);

  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <AuthStorageContext.Provider value={authStorage}>
          <Main
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            setReset={setReset}
          />
        </AuthStorageContext.Provider>
      </ApolloProvider>
    </NativeRouter>
  );
};

export default App;
