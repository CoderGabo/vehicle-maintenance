import { gql } from "@apollo/client";

export const GET_MAINTENANCES = gql`
  query GetMaintenances {
    maintenances {
      id
      appointment {
        id
        requestedServices {
          id
          name
          description
        }
      }
      vehicle {
        licensePlate
      }
    }
  }
`;

export const GET_MAINTENANCES_PAG = gql`
  query GetMaintenancesPag($offset: Int, $limit: Int) {
    maintenancesPag(offset: $offset, limit: $limit) {
      totalPages
      data {
        ... on Maintenance {
          id
          date
          status
          details {
            description
            cost
          }
          employeeId
          appointmentId
          vehicleId
          employee {
            id
            firstName
            lastName
            email
          }
          appointment {
            id
            requestedServices {
              id
              name
              description
            }
          }
          vehicle {
            id
            licensePlate
          }
        }
      }
    }
  }
`;

export const GET_MAINTENANCE_BY_ID = gql`
  query GetMaintenanceById($id: ID!) {
    maintenance(id: $id) {
      id
      description
      appointment {
        id
        requestedServices {
          id
          name
          description
        }
      }
      details {
        id
        description
        cost
      }
      vehicle {
        id
        licensePlate
        brand
        model
        year
      }
    }
  }
`;

export const GET_MAINTENANCES_NOT_COMPLETED = gql`
  query GetMaintenancesNotCompleted {
    maintenancesNotCompleted {
      id
      date
      status
      details {
        description
        cost
      }
      employeeId
      appointmentId
      vehicleId
      employee {
        id
        firstName
        lastName
        email
      }
      appointment {
        id
        requestedServices {
          id
          name
          description
        }
      }
      vehicle {
        id
        licensePlate
      }
    }
  }
`;

export const GET_MAINTENANCES_NOT_COMPLETED_PAG = gql`
  query GetMaintenancesNotCompletedPag($offset: Int, $limit: Int) {
    maintenancesNotCompletedPag(offset: $offset, limit: $limit) {
      totalPages
      data {
        ... on Maintenance {
          id
          date
          status
          details {
            description
            cost
          }
          employeeId
          appointmentId
          vehicleId
          employee {
            id
            firstName
            lastName
            email
          }
          appointment {
            id
            requestedServices {
              id
              name
              description
            }
          }
          vehicle {
            id
            licensePlate
          }
        }
      }
    }
  }
`;

export const GET_MAINTENANCE_BY_APPOINTMENT = gql`
  query GetMaintenanceByAppointment($appointmentId: String!) {
    maintenanceByAppointment(id: $appointmentId) {
      id
      status
      details {
        description
        cost
      }
      vehicle {
        id
        licensePlate
      }
    }
  }
`;
