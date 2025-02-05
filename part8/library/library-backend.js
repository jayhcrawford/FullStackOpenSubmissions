const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const { v1: uuid } = require("uuid");

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

const typeDefs = `
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
/* 
mutation editFavGenre($token: String!, $favoriteGenre) {
  editFavGenre(token: $token, favoriteGenre: $favoriteGenre) {
    favoriteGenre
  }
}
 */
const resolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      const library = await Book.find({});

      let libraryWithAuthorData = [];

      for (const book of library) {
        const result = await Author.find({ name: book.author });
        let newEntry = {
          id: book._id,
          title: book.title,
          author: {
            name: result[0].name,
            born: result[0].born,
            bookCount: result[0].bookCount,
            id: result[0]._id,
          },
          genres: book.genres,
          published: book.published,
        };
        libraryWithAuthorData.push(newEntry);
      }
      return libraryWithAuthorData;
    },
    allAuthors: async () => {
      /*   let result = [];
      authors.forEach((author) => {
        let newAuthor = {
          name: author.name,
          born: author.born,
          bookCount: 0,
        };

        books.forEach((book) => {
          if (book.author == author.name) {
            newAuthor.bookCount = newAuthor.bookCount + 1;
          }
        });

        result.push(newAuthor);
      });
      return result; */

      const result = await Author.find({});
      return result;
    },
    me: async () => {
      const me = await User.findOne();

      const simpleMe = {
        id: me._id,
        username: me.username,
        favoriteGenre: me.favoriteGenre,
      };

      return simpleMe;
    },
  },
  Mutation: {
    genreFilter: async (root, args) => {
      const library = await Book.find({
        genres: { $in: [args.genre] },
      });

      libraryWithAuthorData = [];

      for (const book of library) {
        const result = await Author.find({ name: book.author });
        let newEntry = {
          id: book._id,
          title: book.title,
          author: {
            name: result[0].name,
            born: result[0].born,
            bookCount: result[0].bookCount,
            id: result[0]._id,
          },
          genres: book.genres,
          published: book.published,
        };
        libraryWithAuthorData.push(newEntry);
      }

      return libraryWithAuthorData;
    },
    addBook: async (root, args) => {
      let book = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
      });

      const token = args.token;
      const tokenSuccess = jwt.verify(token, process.env.SECRET);

      if (!tokenSuccess) {
        throw new GraphQLError("Token Invalid", {
          extensions: {
            code: "INVALID_TOKEN",
            invalidArgs: args.username,
            error,
          },
        });
      }

      const author = await Author.find({ name: args.author });

      if (author.length === 0) {
        const newAuthor = new Author({ name: args.author, bookCount: 1 });
        await newAuthor.save();
        book.author = newAuthor.name;
      } else {
        const newCount = author[0].bookCount + 1;
        const updateAuthor = await Author.findOneAndUpdate(
          { name: args.author },
          { bookCount: newCount },
          { new: true }
        );

        book.author = updateAuthor.name;
      }

      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError("Saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            error,
          },
        });
      }
      return book;
    },
    addAuthor: async (root, args) => {
      const author = new Author({ ...args });

      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError("Saving author failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
      return author;
    },
    editAuthor: async (root, args) => {
      const token = args.token;
      const tokenSuccess = jwt.verify(token, process.env.SECRET);

      if (!tokenSuccess) {
        throw new GraphQLError("Token Invalid", {
          extensions: {
            code: "INVALID_TOKEN",
            invalidArgs: args.username,
            error,
          },
        });
      }

      const author = await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true }
      );

      if (!author) {
        throw new GraphQLError("Updating author failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
      return author;
    },
    createUser: async (root, args) => {
      const user = new User({ ...args });

      try {
        await user.save();
      } catch (error) {
        throw new GraphQLError("Adding a new user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        });
      }
      return user;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      const returnToken = jwt.sign(userForToken, process.env.SECRET);

      return { returnToken, favoriteGenre: user.favoriteGenre };
    },
    editFavGenre: async (root, args) => {
      const decodedToken = jwt.verify(args.token, process.env.SECRET);

      const updatedUser = await User.findOneAndUpdate(
        { _id: decodedToken.id },
        { favoriteGenre: args.favoriteGenre },
        { new: true }
      );

      return { genre: updatedUser.favoriteGenre };
    },
    //TODO: remove this functionality
    reset: async () => {
      await Book.deleteMany({});
      await Author.deleteMany({});

      return true;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
