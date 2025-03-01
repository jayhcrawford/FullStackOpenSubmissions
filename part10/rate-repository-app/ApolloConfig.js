import createApolloClient from "./src/utils/apolloClient";
import AuthStorage from "./src/utils/authStorage";

const authStorage = new AuthStorage();
export const apolloClient = createApolloClient(authStorage);