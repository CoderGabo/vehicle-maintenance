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
  GET_APPOINTMENTS_BY_CUSTOMER_PAG,
  GET_APPOINTMENT_PAG,
  GET_PENDING_APPOINTMENTS_PAG,
} from "../graphql/appointments/queries-appointments";
import { CREATE_MAINTENANCE } from "../graphql/maintenances/mutations-maintenances";
import { VehicleFormData } from "../interface/vehicleFormData";
import { ROWS_PER_PAGE } from "../utils/constants";
import { Role } from "../interface/role.interface";

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
  role: Role;
}

// const customerId = "66678d0d5970455f1e3a06f6";
// const vehicleId = "66699a79ecabca1e7aeb8177";
// const employeeId = "66678dd02a5da74b0ec59e57";

export const RegisterAppointmentPage = () => {
  const navigate = useNavigate();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const [page, setPage] = useState(1);
  // const [rowsPerPage, setRowsPerPage] = useState(3);
  const employeeId = user?.userId

  const { data: allAppointments, loading: isLoading } = useQuery(
    GET_APPOINTMENT_PAG,
    {
      variables: {
        offset: (page - 1),
        limit: ROWS_PER_PAGE,
      },
      fetchPolicy: "network-only",
    }
  );
  const { data: appointmentsByCustomer } = useQuery(
    GET_APPOINTMENTS_BY_CUSTOMER_PAG,
    {
      variables: {
        customerId: employeeId,
        offset: (page - 1),
        limit: ROWS_PER_PAGE,
      },
      fetchPolicy: "network-only",
    }
  );

  const { data: pendingAppointments, refetch } = useQuery(
    GET_PENDING_APPOINTMENTS_PAG,
    {
      variables: {
        offset: (page - 1),
        limit: ROWS_PER_PAGE,
      },
      fetchPolicy: "network-only",
    }
  );

  console.log(pendingAppointments);
  console.log(appointmentsByCustomer);
  console.log(allAppointments);

  const [createMaintenance, { loading, error }] = useMutation(
    CREATE_MAINTENANCE,
    {
      // refetchQueries: [{ query: GET_PENDING_APPOINTMENTS }],
      onCompleted: () => {
        refetch();
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
        appointments = appointmentsByCustomer?.appointmentsByCustomerPag || [];
        break;
      case "EMPLOYEE":
        appointments = pendingAppointments?.pendingAppointmentsPag || [];
        break;
      default:
        appointments = allAppointments?.appointmentsPag || [];
        break;
    }
    return appointments;
  };

  console.log("app to display" + getAppointmentsToDisplay());
  const handleTakeAppointment = (appointmentId: string, vehicleId: string) => {
    console.log(appointmentId, vehicleId, employeeId!)
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
    const userData: User = JSON.parse(localStorage.getItem("user") || "{}");

    setUser(userData);
  }, []);

  const appointmentsToDisplay = getAppointmentsToDisplay();

  const handleChangePage = (
    _event: React.ChangeEvent<unknown> | null,
    value: number
  ) => {
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
      ) : (
        <Box sx={{ mt: 4, paddingLeft: 4 }}>
          {appointmentsToDisplay &&
            appointmentsToDisplay.data?.map((appointment: Appointment) => (
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
                      onClick={() =>
                        handleViewMaintenanceDetails(appointment.id)
                      }
                    >
                      Ver Detalle de Mantenimiento
                    </Button>
                  )}
              </Paper>
            ))}
          <Box mt={4} sx={{ display: "flex", justifyContent: "right" }}>
            <Pagination
              count={
                appointmentsToDisplay ? appointmentsToDisplay.totalPages : 0
              }
              page={page}
              onChange={handleChangePage}
              color="secondary"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#616161",
                },
              }}
            />
          </Box>
        </Box>
      )}
    </ViagioLayout>
  );
};
