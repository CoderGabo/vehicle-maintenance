import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($authDto: AuthDto!) {
    login(authDto: $authDto) {
      id
      token
      username
      role {
        name
        permissions
      }
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser($userDto: UserDto!, $authDto: AuthDto!) {
    registerUser(userDto: $userDto, authDto: $authDto) {
      id
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($userId: ID!) {
    deleteUser(id: $userId) {
      id
    }
  }
`;
