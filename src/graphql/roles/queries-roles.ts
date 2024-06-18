import { gql } from "@apollo/client";

export const GET_ROLES = gql`
  query GetRoles {
    roles {
      id
      name
      description
      permissions
    }
  }
`;

export const GET_ROLES_PAG = gql`
  query GetRolesPag($offset: Int, $limit: Int) {
    rolesPag(offset: $offset, limit: $limit) {
      totalPages
      data {
        ... on Role {
          id
          name
          description
          permissions
        }
      }
    }
  }
`;
