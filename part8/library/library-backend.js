const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const { v1: uuid } = require('uuid')




let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conexión con el libro
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'Demons',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]



/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conexión con el libro
 *//* 

/*
  you can remove the placeholder query once your first one has been implemented */

const typeDefs = `
  type Query {
    authorCount: Int,
    bookCount: Int,
    allBooks(author: String, genre: String): [Book],
    allAuthors: [Author]
  },
  type Book {
    title: String,
    author: String,
    published: Int,
    genres: [String!]
  },
  type Author {
    name: String,
    bookCount: Int,
    born: Int
  },
  type Mutation {
    addBook(
      title: String!
      author: String
      published: Int
      genres: [String!]
    ): Book,
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`; 

const resolvers = {
  Query: {
    authorCount: () => authors.length,
    bookCount: () => books.length,
    allBooks: (root, args) => {
      if (!args.author && !args.genre) {
        let result = [];
        books.forEach((book) => {
          let newBook = {
            title: book.title,
            author: book.author,
            published: book.published,
            genres: book.genres,
          };
          result.push(newBook);
        });
        return result;
      }
      if (args.author && !args.genre) {
        let result = [];
        books.forEach((book) => {
          let newBook = {
            title: book.title,
            author: book.author,
            published: book.published,
            genres: book.genres,
          };

          if (args.author == book.author) {
            result.push(newBook);
          }
        });
        return result;
      }
      if (args.genre && !args.author) {
        let result = [];
        books.forEach((book) => {
          let newBook = {
            title: book.title,
            author: book.author,
            published: book.published,
            genres: book.genres,
          };

          newBook.genres.forEach((genre) => {
            if (genre == args.genre) {
              result.push(newBook);
            }
          });
        });
        return result;
      }
      if (args.genre && args.author) {
        let result = [];

        books.forEach((book) => {
          book.genres.forEach((genre) => {
            if (genre == args.genre && book.author == args.author) {
              result.push(book);
            }
          });
        });

        return result;
      }
    },
    allAuthors: () => {
      let result = [];
      authors.forEach((author) => {
        let newAuthor = {
          name: author.name,
          bookCount: 0,
        };

        books.forEach((book) => {
          if (book.author == author.name) {
            newAuthor.bookCount = newAuthor.bookCount + 1;
          }
        });

        result.push(newAuthor);
      });
      return result;
    },
  },
  Mutation: {
    addBook: (root, args) => {
      const book = { ...args, id: uuid() }
      books = books.concat(book)
      return book 
    },
    editAuthor: (root, args) => {
      const author = authors.find(a => a.name === args.name)
      if (!author) {
        return null
      }

      const updatedAuthor = {...author, born: args.setBornTo} 
      authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
      return updatedAuthor
    }
  }
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

/* 
books.forEach((book) => {
  if (book.author == author.name) {
    newAuthor.bookCount = newAuthor.bookCount + 1
  }
})

 */