import { gql } from "@apollo/client";

export const GET_VEHICLES = gql`
  query GetVehicles {
    vehicles {
      id
      licensePlate
      brand
      model
      year
      vin
    }
  }
`;

export const GET_VEHICLE = gql`
  query GetVehicle($vehicleId: ID!) {
    vehicle(id: $vehicleId) {
      id
      licensePlate
      brand
      model
      year
      vin
      customer {
        firstName
        lastName
      }
    }
  }
`;

export const GET_VEHICLES_BY_CUSTOMER = gql`
  query GetVehiclesByCustomer($customerId: String!) {
    vehiclesByCustomer(customerId: $customerId) {
      id
      licensePlate
      brand
      model
      year
      vin
    }
  }
`;
