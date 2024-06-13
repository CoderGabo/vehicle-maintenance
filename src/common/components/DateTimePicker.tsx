import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { Service } from "../../interface/service.interface";
import { VehicleFormData } from "../../interface/vehicleFormData";
interface DateTimePickerProps {
  open: boolean;
  onClose: () => void;
  onAddAppointment: (
    selectedDate: string,
    selectedTime: string,
    selectedServices: string[],
    selectedVehicle: string
  ) => void;
  availableServices: Service[];
  registeredVehicles: VehicleFormData[];
}

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  open,
  onClose,
  onAddAppointment,
  availableServices,
  registeredVehicles,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [selectedServices, setSelectedServices] = useState<{
    [key: string]: boolean;
  }>({});

  const [selectedVeh, setSelectedVeh] = useState<string>("");

  const handleVehicleChange = (event: SelectChangeEvent<string>) => {
    setSelectedVeh(event.target.value);
  };

  const handleServiceChange = (serviceName: string) => {
    setSelectedServices((prev) => ({
      ...prev,
      [serviceName]: !prev[serviceName],
    }));
  };

  const handleAddAppointment = () => {
    if (selectedDate && selectedTime) {
      const formattedDate = new Intl.DateTimeFormat("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(selectedDate);
      const formattedTime = selectedTime.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const selectedServiceList = availableServices
        .filter((service) => selectedServices[service.id])
        .map((service) => service.id);
      onAddAppointment(
        formattedDate,
        formattedTime,
        selectedServiceList,
        selectedVeh
      );
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Agendar Cita</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <DatePicker
              label="Reserva el día de tu cita"
              value={selectedDate}
              onChange={setSelectedDate}
            />
          </Grid>
          <Grid item xs={6}>
            <TimePicker
              label="Selecciona la hora"
              value={selectedTime}
              onChange={setSelectedTime}
            />
          </Grid>
        </Grid>
        <FormControl sx={{ width: "100%" }}>
          <Select
            labelId="rol-label"
            id="rol"
            value={selectedVeh || ""}
            onChange={handleVehicleChange}
            label="Seleccionar Vehiculo"
            sx={{ color: "white" }}
          >
            {registeredVehicles.map((vehicle) => (
              <MenuItem key={vehicle.id} value={vehicle.id}>
                {vehicle.licensePlate}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box
          mt={2}
          border="1px solid white"
          borderRadius="5px"
          padding="5px"
          maxHeight="300px"
          overflow="auto"
        >
          {availableServices.map((service, index) => (
            <React.Fragment key={service.id}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!selectedServices[service.id]}
                    onChange={() => handleServiceChange(service.id)}
                  />
                }
                label={`${service.name}`}
              />
              {index < availableServices.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={handleAddAppointment}
          color="primary"
        >
          Agregar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
