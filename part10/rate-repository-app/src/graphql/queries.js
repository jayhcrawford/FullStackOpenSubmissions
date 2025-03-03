import { gql } from "@apollo/client";

export const FETCH_REPO = gql`
  query Repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      url
      fullName
      ownerAvatarUrl
      description
      language
      stargazersCount
      forksCount
      reviewCount
      ratingAverage
      reviews {
        edges {
          node {
            id
            createdAt
            rating
            text
            user {
              username
            }
          }
        }
      }
    }
  }
`;

export const FETCH_REPO_REVIEWS = gql`
  query Repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      reviews {
        edges {
          node {
            id
            createdAt
            rating
            text
            user {
              username
            }
          }
        }
      }
    }
  }
`;

export const FETCH_REPOS = gql`
  {
    repositories {
      edges {
        node {
          id
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
