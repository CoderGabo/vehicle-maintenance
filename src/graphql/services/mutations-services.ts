import { gql } from "@apollo/client";

export const CREATE_SERVICE = gql`
  mutation CreateService($serviceDto: ServiceDto!) {
    createService(servicioDto: $serviceDto) {
      id
    }
  }
`;

export const DELETE_SERVICE = gql`
  mutation DeleteService($serviceId: ID!) {
    deleteService(id: $serviceId) {
      id
    }
  }
`;
