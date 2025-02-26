import { gql } from "@apollo/client";

export const FETCH_REPOS = gql`
  {
    repositories {
      edges {
        node {
          fullName
          ownerAvatarUrl
          description
          language
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
        }
      }
    }
  }
`;

export const FETCH_ME = gql`
  {
    me {
      id
      username
    }
  }
`;
