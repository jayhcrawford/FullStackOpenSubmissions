import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import Constants from "expo-constants";
import { setContext } from "@apollo/client/link/context";

const apolloUri = Constants.expoConfig.extra.apollo_uri;

const httpLink = createHttpLink({
  uri: apolloUri,
});

const logLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((result) => {
    return result;
  });
});

const createApolloClient = (authStorage) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      };
    } catch (e) {
      console.log(e);
      return {
        headers,
      };
    }
  });

  /*   return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  }); */

  return new ApolloClient({
    link: ApolloLink.from([
      logLink,
      authLink, httpLink, // Add your custom link here
      // other links (e.g., HttpLink)
    ]),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
