import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      firstName
      lastName
      email
      phone
      address
      position
      username
      roleId
      role {
        name
        permissions
      }
    }
  }
`;

export const GET_USER = gql`
  query GetUser($userId: ID!) {
    user(id: $userId) {
      id
      firstName
      lastName
      email
      phone
      address
      position
      username
      roleId
      role {
        name
        permissions
      }
    }
  }
`;
