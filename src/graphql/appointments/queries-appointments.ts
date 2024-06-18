import { gql } from "@apollo/client";

export const GET_APPOINTMENTS = gql`
  query GetAppointments {
    appointments {
      id
      scheduledDate
      status
      requestedServices {
        id
        name
      }
      customer {
        id
        firstName
        lastName
      }
      vehicle {
        id
        licensePlate
      }
    }
  }
`;

export const GET_APPOINTMENT_PAG = gql`
  query GetAppointmentPag($offset: Int, $limit: Int) {
    appointmentsPag(offset: $offset, limit: $limit) {
      totalPages
      data {
        ... on Appointment {
          id
          scheduledDate
          status
          requestedServiceIds
          customerId
          vehicleId
          requestedServices {
            id
            name
            description
          }
          customer {
            id
            firstName
            lastName
            email
          }
          vehicle {
            id
            licensePlate
            brand
            model
            year
            vin
          }
        }
      }
    }
  }
`;

export const GET_APPOINTMENT = gql`
  query GetAppointment($appointmentId: String!) {
    appointment(id: $appointmentId) {
      id
      scheduledDate
      status
      requestedServiceIds
      customerId
      vehicleId
      requestedServices {
        id
        name
        description
      }
      customer {
        id
        firstName
        lastName
        email
      }
      vehicle {
        id
        licensePlate
        brand
        model
        year
        vin
      }
    }
  }
`;

export const GET_APPOINTMENTS_BY_CUSTOMER = gql`
  query GetAppointmentsByCustomer($customerId: String!) {
    appointmentsByCustomer(customerId: $customerId) {
      id
      scheduledDate
      status
      requestedServices {
        id
        name
      }
      vehicle {
        id
        licensePlate
      }
    }
  }
`;

export const GET_APPOINTMENTS_BY_CUSTOMER_PAG = gql`
  query GetAppointmentsByCustomerPag(
    $customerId: String!
    $offset: Int
    $limit: Int
  ) {
    appointmentsByCustomer(
      customerId: $customerId
      offset: $offset
      limit: $limit
    ) {
      totalPages
      data {
        ... on Appointment {
          id
          scheduledDate
          status
          requestedServices {
            id
            name
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

export const GET_PENDING_APPOINTMENTS = gql`
  query GetPendingAppointments {
    pendingAppointments {
      id
      scheduledDate
      status
      requestedServiceIds
      requestedServices {
        id
        name
      }
      customer {
        id
        firstName
        lastName
      }
      vehicle {
        id
        licensePlate
      }
    }
  }
`;

export const GET_PENDING_APPOINTMENTS_PAG = gql`
  query GetpendingAppointmentsPag($offset: Int, $limit: Int) {
    pendingAppointmentsPag(offset: $offset, limit: $limit) {
      totalPages
      data {
        ... on Appointment {
          id
          scheduledDate
          status
          requestedServices {
            id
            name
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
