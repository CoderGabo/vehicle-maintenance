import { gql } from "@apollo/client";

export const GET_SERVICES = gql`
  query GetServices {
    services {
      id
      name
      description
    }
  }
`;

export const GET_SERVICES_PAG = gql`
  query GetServicesPag($offset: Int, $limit: Int) {
    servicesPag(offset: $offset, limit: $limit) {
      totalPages
      data {
        ... on Servicio {
          id
          name
          description
        }
      }
    }
  }
`;
