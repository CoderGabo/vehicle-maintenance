import { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Paper,
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Alert,
} from "@mui/material";
import { ViagioLayout } from "../viagio/layout/ViagioLayout";
import { DateTimePicker } from "./components/DateTimePicker";
import { useNavigate } from "react-router-dom";
import { Service } from "../interface/service.interface";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_APPOINTMENT } from "../graphql/appointments/mutations-appointments";
import {
  GET_APPOINTMENTS,
  GET_APPOINTMENTS_BY_CUSTOMER,
  GET_PENDING_APPOINTMENTS,
} from "../graphql/appointments/queries-appointments";
import { GET_SERVICES } from "../graphql/services/queries-services";
import { CREATE_MAINTENANCE } from "../graphql/maintenances/mutations-maintenances";
import { VehicleFormData } from "../interface/vehicleFormData";
import { GET_VEHICLES_BY_CUSTOMER } from "../graphql/vehicles/queries-vehicles";

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
  role: string;
}


const customerId = "66678d0d5970455f1e3a06f6";
// const vehicleId = "66699a79ecabca1e7aeb8177";
const employeeId = "66678dd02a5da74b0ec59e57";

export const RegisterAppointmentPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const { data: ServicesData } = useQuery(GET_SERVICES);
  const { data: allAppointments } = useQuery(GET_APPOINTMENTS);
  const { data: appointmentsByCustomer } = useQuery(
    GET_APPOINTMENTS_BY_CUSTOMER,
    {
      variables: { customerId },
    }
  );

  const { data: vehiclesCustomer } = useQuery(GET_VEHICLES_BY_CUSTOMER, {
    variables: { customerId },
  });

  const { data: pendingAppointments } = useQuery(GET_PENDING_APPOINTMENTS);

  console.log(pendingAppointments);
  const [createAppointment, { error: creationError }] = useMutation(
    CREATE_APPOINTMENT,
    {
      refetchQueries: [
        { query: GET_APPOINTMENTS_BY_CUSTOMER, variables: { customerId } },
      ],
      onCompleted: () => {
        setOpen(false);
        // Implementar lógica después de la creación exitosa
      },
    }
  );

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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleAddAppointment = (
    selectedDate: string,
    selectedTime: string,
    selectedServices: string[],
    vehicleId: string
  ) => {
    const scheduledDate = `${selectedDate} ${selectedTime}`; // Concatenación de la fecha y la hora
    createAppointment({
      variables: {
        appointmentDto: {
          scheduledDate,
          requestedServiceIds: selectedServices,
          customerId,
          vehicleId,
        },
      },
    });
  };

  // Asegurándonos de que getAppointmentsToDisplay retorna un array
  const getAppointmentsToDisplay = () => {
    let appointments = [];
    switch (user?.role) {
      case "customer":
        appointments = appointmentsByCustomer?.appointmentsByCustomer || [];
        break;
      case "employee":
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

  if (creationError) {
    setOpenDialog(true);
  }

  useEffect(() => {
    // Simulación de obtención de datos de localStorage
    const userData: User = JSON.parse(localStorage.getItem("user")|| "{}");

    setUser(userData);
  }, []);

  const appointmentsToDisplay = getAppointmentsToDisplay();

  return (
    <ViagioLayout>
      {user?.role === "customer" && (
        <Box mt={4} paddingLeft={4}>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Agendar Cita
          </Button>
        </Box>
      )}
      {creationError && (
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {String(creationError)}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={handleCloseDialog}>
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {showSuccessAlert && (
        <Alert severity="success">Cita Tomada exitosamente</Alert>
      )}
      {error && <Alert severity="error">{String(error)}</Alert>}
      <DateTimePicker
        open={open}
        onClose={handleClose}
        onAddAppointment={handleAddAppointment}
        availableServices={ServicesData?.services || []}
        registeredVehicles={vehiclesCustomer?.vehiclesByCustomer || []}
      />
      <Box sx={{ mt: 4, paddingLeft: 4 }}>
        {Array.isArray(appointmentsToDisplay) &&
          appointmentsToDisplay.map((appointment: Appointment) => (
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
              {user?.role === "employee" &&
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
              {user?.role === "customer" &&
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
      </Box>
    </ViagioLayout>
  );
};
