import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";

import { Route, Routes, Navigate } from "react-router-native";
import SignIn from "./SignIn";
import { useContext, useEffect, useState } from "react";
import AuthProvider, { AuthStorageContext } from "../contexts/Context_AuthProvider";

const Main = (props) => {
  //const {state, dispatch} = useContext(AuthStorageContext);

  const [reset, setReset] = useState(""); 
  const [storage, setStorage] = useState({});

  //console.log("(FROM: Main.jsx) the state is: ", state)

  useEffect(() => {
    //this function fetches all data that is stored in AsyncStorage
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

    //if the user is not logged in, this will be called
    //TODO: Refactor
/*     if (!loggedIn) {
      getAllData();
    } */

    //This app level useEffect will validate credentials..?
/* 
    if (!loggedIn && Object.hasOwn(storage, "auth:token")) {
      //verify that the user is logged in with a valid token here
 */
      // setLoggedIn(true);
      // triggerRefetch();
    // } else if (reset == "reset") {
      //this happens on logout
      //TODO: refactor " 'reset' operation into a standalone hook"

      // authStorage.removeAccessToken();
      // apolloClient.resetStore();
      // setLoggedIn(false);
      // setReset("");

      // triggerRefetch();
    // }
  }, [reset]);

  return (
    <>
      <AppBar loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn} />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route
          path="/SignIn"
          element={
            <SignIn
              loggedIn={props.loggedIn}
              setLoggedIn={props.setLoggedIn}
              setReset={props.setReset}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default Main;
