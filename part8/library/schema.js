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
`

module.exports = typeDefs;