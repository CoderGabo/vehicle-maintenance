import { gql } from "@apollo/client";

export const CREATE_MAINTENANCE = gql`
  mutation CreateMaintenance($maintenanceDto: MaintenanceDto!) {
    createMaintenance(maintenanceDto: $maintenanceDto) {
      id
      date
      status
      details {
        description
        cost
      }
    }
  }
`;

export const DELETE_MAINTENANCE = gql`
  mutation DeleteMaintenance($id: ID!) {
    deleteMaintenance(id: $id) {
      id
    }
  }
`;

export const ADD_DETAILS = gql`
  mutation AddDetails($id: ID!, $detailDtos: [DetailDto!]!) {
    addDetails(id: $id, detailDtos: $detailDtos) {
      id
      date
      status
      details {
        description
        cost
      }
    }
  }
`;

export const COMPLETED_STATUS = gql`
  mutation CompletedStatus(
    $id: ID!
    $description: String
    $detailDtos: [DetailDto]
  ) {
    completedStatus(
      id: $id
      description: $description
      detailDtos: $detailDtos
    ) {
      id
    }
  }
`;
