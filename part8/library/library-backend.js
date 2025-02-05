const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const { v1: uuid } = require("uuid");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

//TODO: remove the reset functionality

require("dotenv").config();
const MONGODB_URI = process.env.MONGODB_URI;

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const jwt = require("jsonwebtoken");

//For simplicity, we assume that all users have the same password
const password = "secret";

const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

console.log("connecting to MongoDB");
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "Demons",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

/* const typeDefs = `
  type Query {
    authorCount: Int,
    bookCount: Int,
    allBooks(author: String, genre: String): [Book],
    allAuthors: [Author],
    me: User
  },
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  },
  type Token {
      returnToken: String!,
      favoriteGenre: String!
  },
  type Book {
    title: String!,
    author: Author!,
    published: Int!,
    genres: [String!],
    id: ID!
  },
  type Author {
    name: String!,
    bookCount: Int,
    born: Int,
    id: ID!
  },
  type Genre {
    genre: String!
  },
  type Mutation {
    genreFilter(
      genre: String!
    ): [Book!]
    addBook(
      token: String!
      title: String!
      author: String!
      published: Int!
      genres: [String!]
    ): Book,
    addAuthor(
      name: String!
      born: Int!
    ): Author,
    editAuthor(
      token: String!
      name: String!
      setBornTo: Int!
    ): Author,
    createUser(
      username: String!
      favoriteGenre: String!
    ): User,
    login(
      username: String!
      password: String!
    ): Token,
    editFavGenre(
      token: String!
      favoriteGenre: String!
    ): Genre,
    reset(
      reset: Boolean!
    ): Boolean
  }
`;
 */

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
