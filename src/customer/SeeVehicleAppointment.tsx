import { useEffect, useState } from "react";
import {
  Button,
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Alert,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import { ViagioLayout } from "../viagio/layout/ViagioLayout";
import { DateTimePicker } from "./components/DateTimePicker";
import { useMutation, useQuery } from "@apollo/client";

import { CREATE_APPOINTMENT } from "../graphql/appointments/mutations-appointments";
import { GET_APPOINTMENTS_BY_CUSTOMER } from "../graphql/appointments/queries-appointments";
import { GET_SERVICES } from "../graphql/services/queries-services";
import { GET_VEHICLES_BY_CUSTOMER } from "../graphql/vehicles/queries-vehicles";

import { VehicleFormData } from "../interface/vehicleFormData";
import { Role } from "../interface/role.interface";

interface User {
  userId: string;
  username: string;
  token: string;
  role: Role;
}

export const SeeVehicleAppointment = () => {
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(
    null
  );

  const { data: ServicesData } = useQuery(GET_SERVICES);
  const userId = user?.userId;
  console.log(userId);

  const { data: vehiclesCustomer, loading: isLoading, refetch } = useQuery<{
    vehiclesByCustomer: VehicleFormData[];
  }>(GET_VEHICLES_BY_CUSTOMER, {
    variables: { customerId: userId },
    fetchPolicy: "network-only",
  });
  // const result = useQuery(GET_VEHICLES_BY_CUSTOMER, {
  //   variables: { userId },
  // });
  // console.log(result);
  console.log(vehiclesCustomer);

  const [createAppointment, { error: creationError }] = useMutation(
    CREATE_APPOINTMENT,
    {
      refetchQueries: [
        {
          query: GET_APPOINTMENTS_BY_CUSTOMER,
          variables: { customerId: userId },
          fetchPolicy: "network-only",
        },
      ],
      onCompleted: () => {
        refetch();
        setOpen(false);
        setShowSuccessAlert(true);
        setTimeout(() => setShowSuccessAlert(false), 5000);
      },
    }
  );

  const handleOpen = (vehicleId: string) => {
    setSelectedVehicleId(vehicleId);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddAppointment = (
    selectedDate: string,
    selectedTime: string,
    selectedServices: string[]
  ) => {
    const scheduledDate = `${selectedDate} ${selectedTime}`;
    createAppointment({
      variables: {
        appointmentDto: {
          scheduledDate,
          requestedServiceIds: selectedServices,
          customerId: userId,
          vehicleId: selectedVehicleId,
        },
      },
    });
  };

  useEffect(() => {
    const userData: User = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(userData);
  }, []);

  return (
    <ViagioLayout>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Box mt={4} paddingLeft={4}>
            {vehiclesCustomer?.vehiclesByCustomer.map((vehicle) => (
              <Paper
                key={vehicle.id}
                sx={{
                  p: 2,
                  mt: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography>
                  {vehicle.year} {vehicle.brand} {vehicle.model}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleOpen(vehicle.id!)}
                >
                  Agendar Cita
                </Button>
              </Paper>
            ))}
          </Box>
          <DateTimePicker
            open={open}
            onClose={handleClose}
            onAddAppointment={handleAddAppointment}
            availableServices={ServicesData?.services || []}
            registeredVehicles={vehiclesCustomer?.vehiclesByCustomer || []}
          />
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
            <Alert severity="success">Cita Agendada exitosamente</Alert>
          )}
        </>
      )}
    </ViagioLayout>
  );
};
