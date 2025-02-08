import { gql } from "@apollo/client";

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
      }
      published
      genres
    }
  }
`;

export const GENRE_FILTER_BOOKS = gql`
  mutation genreFilter($genre: String!) {
    genreFilter(genre: $genre) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation addBook(
    $token: String!
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]
  ) {
    addBook(
      token: $token
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
    }
  }
`;

export const BOOK_ADDED = gql`
  subscription NewBook {
    bookAdded {
      title
      published
      genres
    }
  }
`;

export const UPDATE_AUTHOR = gql`
  mutation editAuthor($token: String!, $name: String!, $setBornTo: Int!) {
    editAuthor(token: $token, name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;

export const UPDATE_FAV_GENRE = gql`
  mutation editFavGenre($token: String!, $favoriteGenre: String!) {
    editFavGenre(token: $token, favoriteGenre: $favoriteGenre) {
      genre
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      returnToken
      favoriteGenre
    }
  }
`;
