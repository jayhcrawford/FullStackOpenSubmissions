const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const { GraphQLError } = require("graphql");
const { v1: uuid } = require("uuid");
const jwt = require("jsonwebtoken");

const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

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

      /*       type Author {
        name: String!,
        bookCount: Int,
        born: Int,
        id: ID!
      },  type Author {
        name: String!,
        bookCount: Int,
        born: Int,
        id: ID!
      },
 */
      const authorDetails = await Author.findOne({ name: book.author });

      const name = book.author;

      console.log(authorDetails);

      const bookWithAuthorDetails = {
        ...book,
        author: {
          name: name,
        },
      };

      pubsub.publish("BOOK_CREATED", { bookAdded: bookWithAuthorDetails });

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
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator(['BOOK_CREATED'])
    },
  },
};
module.exports = resolvers;
