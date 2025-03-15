import Main from "./src/components/Main";
import { NativeRouter } from "react-router-native";
import { ApolloProvider } from "@apollo/client";
import { AuthProvider } from "./src/contexts/Context_AuthProvider";
import { apolloClient } from "./ApolloConfig";

import * as React from "react";
import { AppRegistry } from "react-native";

import appConfig from "./app.config";

const App = () => {
  return (
    <NativeRouter>
      <AuthProvider>
        <ApolloProvider client={apolloClient}>
          <Main />
        </ApolloProvider>
      </AuthProvider>
    </NativeRouter>
  );
};

export default App;

AppRegistry.registerComponent(appConfig, () => Main);
