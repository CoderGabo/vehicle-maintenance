import { gql } from "@apollo/client";

export const CREATE_ROLE = gql`
  mutation CreateRole($roleDto: RoleDto!) {
    createRole(roleDto: $roleDto) {
      id
      name
      description
      permissions
    }
  }
`;

export const UPDATE_ROLE = gql`
  mutation UpdateRole($roleId: ID!, $roleDto: RoleDto!) {
    updateRole(id: $roleId, roleDto: $roleDto) {
      id
      name
      description
      permissions
    }
  }
`;

export const DELETE_ROLE = gql`
  mutation DeleteRole($roleId: ID!) {
    deleteRole(id: $roleId) {
      id
    }
  }
`;
