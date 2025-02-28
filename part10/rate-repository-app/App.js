import Main from "./src/components/Main";
import { NativeRouter } from "react-router-native";
import { ApolloProvider } from "@apollo/client";
import createApolloClient from "./src/utils/apolloClient";
import {
  AuthProvider,
} from "./src/contexts/Context_AuthProvider";

import AuthStorage from "./src/utils/authStorage";

const authStorage = new AuthStorage();
export const apolloClient = createApolloClient(authStorage);

export const triggerRefetch = async () => {
  await apolloClient.reFetchObservableQueries();
};

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
