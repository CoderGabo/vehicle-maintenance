import { gql } from "@apollo/client";

export const CREATE_VEHICLE = gql`
  mutation CreateVehicle($vehicleDto: VehicleDto!) {
    createVehicle(vehicleDto: $vehicleDto) {
      id
    }
  }
`;

export const DELETE_VEHICLE = gql`
  mutation DeleteVehicle($vehicleId: ID!) {
    deleteVehicle(id: $vehicleId) {
      id
    }
  }
`;
