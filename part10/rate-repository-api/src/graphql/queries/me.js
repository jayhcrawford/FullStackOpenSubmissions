import { gql } from 'apollo-server';

export const typeDefs = gql`
  extend type Query {
    """
    Returns the authenticated user.
    """
    me: User
  }
`;

export const resolvers = {
  Query: {
    me: (obj, args, { authService }) => {
      console.log("in the me obj: ", obj)
      console.log("in the me args: ", args)

      console.log("in the me auth: ", authService)



      return authService.getUser();
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
