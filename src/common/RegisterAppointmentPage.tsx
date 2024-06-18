import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Paper,
  Box,
  Alert,
  Pagination,
  CircularProgress,
} from "@mui/material";
import { ViagioLayout } from "../viagio/layout/ViagioLayout";
import { Service } from "../interface/service.interface";
import { useMutation, useQuery } from "@apollo/client";

import {
  GET_APPOINTMENTS,
  GET_APPOINTMENTS_BY_CUSTOMER,
  GET_PENDING_APPOINTMENTS,
} from "../graphql/appointments/queries-appointments";
import { CREATE_MAINTENANCE } from "../graphql/maintenances/mutations-maintenances";
import { VehicleFormData } from "../interface/vehicleFormData";

interface Appointment {
  id: string;
  scheduledDate: string;
  requestedServices: Service[];
  vehicle: VehicleFormData;
  status: "pending" | "in-progress" | "completed";
}

interface User {
  userId: string;
  username: string;
  token: string;
  role: any;
}

// const appointments: Appointment[] = [
//   {
//     id: "1",
//     scheduledDate: "2023-07-01T10:00:00",
//     requestedServices: [
//       { id: "101", name: "Oil Change" },
//       { id: "102", name: "Tire Rotation" },
//     ],
//     vehicle: { id: "vehicle1", customerId: "66678d0d5970455f1e3a06f6" },
//     status: "pending",
//   },
//   {
//     id: "2",
//     scheduledDate: "2023-07-02T13:00:00",
//     requestedServices: [{ id: "103", name: "Brake Inspection" }],
//     vehicle: { id: "vehicle2", customerId: "66678d0d5970455f1e3a05r6" },
//     status: "in-progress",
//   },
//   {
//     id: "3",
//     scheduledDate: "2023-07-03T15:30:00",
//     requestedServices: [
//       { id: "104", name: "Wheel Alignment" },
//       { id: "105", name: "Engine Diagnostic" },
//     ],
//     vehicle: { id: "vehicle3", customerId: "66678d0d5970455f1e3a06f6" },
//     status: "completed",
//   },
// ];

const customerId = "66678d0d5970455f1e3a06f6";
// const vehicleId = "66699a79ecabca1e7aeb8177";
const employeeId = "66678dd02a5da74b0ec59e57";

export const RegisterAppointmentPage = () => {
  const navigate = useNavigate();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const [page, setPage] = useState(1);
  // const [rowsPerPage, setRowsPerPage] = useState(3);

  const { data: allAppointments, loading: isLoading } = useQuery(GET_APPOINTMENTS);
  const { data: appointmentsByCustomer } = useQuery(
    GET_APPOINTMENTS_BY_CUSTOMER,
    {
      variables: { customerId },
    }
  );

  const { data: pendingAppointments } = useQuery(GET_PENDING_APPOINTMENTS);

  console.log(pendingAppointments);
  console.log(appointmentsByCustomer);
  console.log(allAppointments);

  const [createMaintenance, { loading, error }] = useMutation(
    CREATE_MAINTENANCE,
    {
      refetchQueries: [{ query: GET_PENDING_APPOINTMENTS }],
      onCompleted: () => {
        //console.log("Cita tomada exitosamente");
        setShowSuccessAlert(true);
        // Opcionalmente, puedes reiniciar el mensaje de éxito después de unos segundos
        setTimeout(() => setShowSuccessAlert(false), 5000);
      },
    }
  );

  // Asegurándonos de que getAppointmentsToDisplay retorna un array
  const getAppointmentsToDisplay = () => {
    let appointments = [];
    switch (user?.role.name) {
      case "CUSTOMER":
        appointments = appointmentsByCustomer?.appointmentsByCustomer || [];
        break;
      case "EMPLOYEE":
        appointments = pendingAppointments?.pendingAppointments || [];
        break;
      default:
        appointments = allAppointments?.appointments || [];
        break;
    }
    return appointments;
  };

  console.log("app to display" + getAppointmentsToDisplay());
  const handleTakeAppointment = (appointmentId: string, vehicleId: string) => {
    createMaintenance({
      variables: {
        maintenanceDto: {
          appointmentId,
          vehicleId,
          employeeId,
        },
      },
    });
  };

  const handleViewMaintenanceDetails = (id: string) => {
    navigate(`/mantenimiento/detalle/cliente/${id}`);
  };

  useEffect(() => {
    // Simulación de obtención de datos de localStorage
    const userData: User = JSON.parse(localStorage.getItem("user")|| "{}");

    setUser(userData);
  }, []);

  const appointmentsToDisplay = getAppointmentsToDisplay();

  const handleChangePage = (_event: React.ChangeEvent<unknown> | null, value: number) => {
    setPage(value);
  };

  return (
    <ViagioLayout>
      {error && <Alert severity="error">{String(error)}</Alert>}
      {showSuccessAlert && (
        <Alert severity="success">Cita Tomada exitosamente</Alert>
      )}
      {isLoading ? (
        <CircularProgress />
      ) :( 
        <Box sx={{ mt: 4, paddingLeft: 4 }}>
        {Array.isArray(appointmentsToDisplay) &&
          appointmentsToDisplay
          .slice((page - 1) * 3, page * 3)
          .map((appointment: Appointment) => (
            <Paper key={appointment.id} sx={{ p: 2, mt: 2 }}>
              <Typography variant="h6">
                Fecha y Hora: {appointment.scheduledDate}
              </Typography>
              <Typography>Servicios:</Typography>
              <ul>
                {appointment.requestedServices?.map((service) => (
                  <li key={service.id}>{service.name}</li>
                ))}
              </ul>
              <Typography>Estado: {appointment.status}</Typography>
              {user?.role.name === "EMPLOYEE" &&
                appointment.status === "pending" && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      handleTakeAppointment(
                        appointment.id,
                        appointment.vehicle.id + ""
                      )
                    }
                    disabled={loading}
                  >
                    {loading ? "Enviando..." : "Tomar Cita"}
                  </Button>
                )}
              {user?.role.name === "CUSTOMER" &&
                appointment.status === "completed" && (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleViewMaintenanceDetails(appointment.id)}
                  >
                    Ver Detalle de Mantenimiento
                  </Button>
                )}
            </Paper>
          ))}
          <Box mt={4} sx={{ display: 'flex', justifyContent: 'right' }}>
            <Pagination
              count={Math.ceil(appointmentsToDisplay.length / 3)}
              page={page}
              onChange={handleChangePage}
              color="secondary"
              sx={{
                '& .MuiPaginationItem-root': {
                  color: '#616161',
                }
              }}
            />
          </Box>
      </Box>
      )}
    </ViagioLayout>
  );
};
