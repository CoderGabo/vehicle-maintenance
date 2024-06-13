import { gql } from "@apollo/client";

export const CREATE_APPOINTMENT = gql`
  mutation CreateAppointment($appointmentDto: AppointmentDto!) {
    createAppointment(appointmentDto: $appointmentDto) {
      id
    }
  }
`;

export const DELETE_APPOINTMENT = gql`
  mutation DeleteAppointment($appointmentId: ID!) {
    deleteAppointment(id: $appointmentId) {
      id
    }
  }
`;
