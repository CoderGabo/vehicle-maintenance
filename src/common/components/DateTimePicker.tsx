import React, { useState } from 'react';
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel, Grid } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
interface DateTimePickerProps {
    open: boolean;
    onClose: () => void;
    onAddAppointment: (selectedDate: string, selectedTime: string, selectedServices: string[]) => void;
    availableServices: string[];
}

export const DateTimePicker: React.FC<DateTimePickerProps> = ({ open, onClose, onAddAppointment, availableServices }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<Date | null>(null);
    const [selectedServices, setSelectedServices] = useState<{ [key: string]: boolean }>({});

    const handleServiceChange = (serviceName: string) => {
        setSelectedServices(prev => ({
            ...prev,
            [serviceName]: !prev[serviceName],
        }));
    };

    const handleAddAppointment = () => {
        if (selectedDate && selectedTime) {
            const formattedDate = selectedDate.toLocaleDateString('es-ES');
            const formattedTime = selectedTime.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
            const selectedServiceList = availableServices.filter(service => selectedServices[service]);
            onAddAppointment(formattedDate, formattedTime, selectedServiceList);
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
                <Box mt={2} border="1px solid white" borderRadius="5px" padding="5px" maxHeight="300px" overflow="auto">
                    {availableServices.map((service, index) => (
                        <React.Fragment key={index}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={!!selectedServices[service]}
                                        onChange={() => handleServiceChange(service)}
                                    />
                                }
                                label={`${service}`}
                            />
                            {index < availableServices.length - 1 && <Divider />}
                        </React.Fragment>
                    ))}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={onClose} color="secondary">Cancelar</Button>
                <Button variant="contained" onClick={handleAddAppointment} color="primary">Agregar</Button>
            </DialogActions>
        </Dialog>
    );
};