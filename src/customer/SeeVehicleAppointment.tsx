import { useState } from "react";
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
} from "@mui/material";
import { ViagioLayout } from "../viagio/layout/ViagioLayout";
import { DateTimePicker } from "./components/DateTimePicker";
import { useMutation, useQuery } from "@apollo/client";

import { CREATE_APPOINTMENT } from "../graphql/appointments/mutations-appointments";
import { GET_APPOINTMENTS_BY_CUSTOMER } from "../graphql/appointments/queries-appointments";
import { GET_SERVICES } from "../graphql/services/queries-services";
import { GET_VEHICLES_BY_CUSTOMER } from "../graphql/vehicles/queries-vehicles";

import { VehicleFormData } from "../interface/vehicleFormData";

// interface User {
//   userId: string;
//   username: string;
//   token: string;
//   role: any;
// }

const customerId = "66678d0d5970455f1e3a06f6";

export const SeeVehicleAppointment = () => {
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  // const [user, setUser] = useState<User | null>(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);

  const { data: ServicesData } = useQuery(GET_SERVICES);

  const { data: vehiclesCustomer } = useQuery(GET_VEHICLES_BY_CUSTOMER, {
    variables: { customerId },
  });

  const [createAppointment, { error: creationError }] = useMutation(
    CREATE_APPOINTMENT,
    {
      refetchQueries: [
        { query: GET_APPOINTMENTS_BY_CUSTOMER, variables: { customerId } },
      ],
      onCompleted: () => {
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
    selectedServices: string[],
  ) => {
    const scheduledDate = `${selectedDate} ${selectedTime}`;
    createAppointment({
      variables: {
        appointmentDto: {
          scheduledDate,
          requestedServiceIds: selectedServices,
          customerId,
          vehicleId: selectedVehicleId,
        },
      },
    });
  };

  // useEffect(() => {
  //   const userData: User = JSON.parse(localStorage.getItem("user") || "{}");
  //   setUser(userData);
  // }, []);

  const fakeVehicles: VehicleFormData[] = [
    { id: "1", brand: "Toyota", model: "Corolla",licensePlate: 'ABV1234', vin: "R3232F4F3F3F3",  year: 2018, customerId: '893NF3932F' },
    { id: "2", brand: "Honda", model: "Civic",licensePlate: 'ASV1234',  vin: "44535636F", year: 2019, customerId: '893NF3932F'  },
    { id: "3", brand: "Ford", model: "Focus",licensePlate: 'ABC1234',  vin: "R33F3FFDWFWEFWF" ,year: 2020, customerId: '893NF3932F'  },
  ];

  return (
    <ViagioLayout>
      <Box mt={4} paddingLeft={4}>
        {fakeVehicles.map((vehicle) => (
          <Paper key={vehicle.id} sx={{ p: 2, mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography>
              {vehicle.year} {vehicle.brand} {vehicle.model}
            </Typography>
            <Button variant="contained" color="primary" onClick={() => handleOpen(vehicle.id!)}>
              Agendar Cita
            </Button>
          </Paper>
        ))} 
      </Box>
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
      <DateTimePicker
        open={open}
        onClose={handleClose}
        onAddAppointment={handleAddAppointment}
        availableServices={ServicesData?.services || []}
        registeredVehicles={vehiclesCustomer?.vehiclesByCustomer || []}
      />
    </ViagioLayout>
  );
};
