import { useState } from 'react';
import { Typography, Button, Paper, Box } from '@mui/material';
import { ViagioLayout } from '../viagio/layout/ViagioLayout';
import { DateTimePicker } from './components/DateTimePicker'; // Importamos el componente DateTimePicker
import { useNavigate } from 'react-router-dom';

interface Service {
    name: string;
}

interface Appointment {
    id: number;
    scheduledate: string; // Cambiado a tipo string
    services: Service[];
    status: 'pending' | 'in-progress' | 'completed';
}

const initialAppointments: Appointment[] = [
    {
        id: 1,
        scheduledate: '2023-06-15 10:50',
        services: [{ name: 'Cambio de aceite'}],
        status: 'completed',
    },
    {
        id: 2,
        scheduledate: '2023-06-15 20:00',
        services: [{ name: 'Inspección de frenos' }],
        status: 'in-progress',
    },
    {
        id: 3,
        scheduledate: '2023-06-15 14:00',
        services: [{ name: 'Diagnóstico del motor'}],
        status: 'pending',
    },
];

const availableServices: Service[] = [
    { name: 'Cambio de aceite' },
    { name: 'Cambio de llantas' },
    { name: 'Limpieza externa' },
    { name: 'Revisión de frenos'},
    { name: 'Alineación y balanceo' },
    { name: 'Cambio de filtro de aire' },
    { name: 'Revisión de la suspensión'},
    { name: 'Cambio de bujías' },
    { name: 'Alineación de dirección'},
    { name: 'Alineación de dirección foehfofihfofwhi'},
];

type UserRole = 'customer' | 'employee' | 'admin';

export const RegisterAppointmentPage = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleAddAppointment = (selectedDate: string, selectedTime: string, selectedServices: string[]) => {
        const maxId = appointments.length > 0 ? Math.max(...appointments.map(a => a.id)) : 0;
        const newId = maxId + 1;

        const scheduledate = `${selectedDate} ${selectedTime}`; // Concatenación de la fecha y la hora

        const newAppointment: Appointment = {
            id: newId,
            scheduledate: scheduledate,
            services: selectedServices.map(serviceName => ({ name: serviceName })),
            status: 'pending',
        };

        setAppointments([...appointments, newAppointment]);
        handleClose();
        // Crear el objeto que emula FormData
        const formData = {
            datos: {
                schedule: scheduledate,
                services: selectedServices
            }
        };

        // Console log del objeto FormData emulado
        console.log('FormData:', formData);
    };

    const handleTakeAppointment = (index: number) => {
        const updatedAppointments = appointments.map((appointment, i) =>
            i === index ? { ...appointment, status: 'in-progress' } : appointment
        ) as Appointment[];
        setAppointments(updatedAppointments);
    };

    const handleViewMaintenanceDetails = (id: number) => {
        navigate(`/mantenimiento/detalle/cliente/${id}`);
    };


    const userRole: UserRole = 'customer';

    return (
        <ViagioLayout>
            {userRole === 'customer' && (
                <Box mt={4} paddingLeft={4}>
                    <Button variant="contained" color="primary" onClick={handleOpen}>
                        Agendar Cita
                    </Button>
                </Box>
            )}

            <DateTimePicker
                open={open}
                onClose={handleClose}
                onAddAppointment={handleAddAppointment}
                availableServices={availableServices.map(service => service.name)}
            />

            <Box sx={{ mt: 4, paddingLeft: 4 }}>
                {appointments.map((appointment, index) => (
                    <Paper key={index} sx={{ p: 2, mt: 2 }}>
                        <Typography variant="h6">Fecha y Hora: {appointment.scheduledate}</Typography>
                        <Typography>Servicios:</Typography>
                        <ul>
                            {appointment.services.map((service, idx) => (
                                <li key={idx}>{service.name}</li>
                            ))}
                        </ul>
                        <Typography>Estado: {appointment.status}</Typography>
                        {userRole === 'employee' && appointment.status === 'pending' && (
                            <Button variant="contained" color="primary" onClick={() => handleTakeAppointment(index)}>
                                Tomar Cita
                            </Button>
                        )}
                        {userRole === 'customer' && appointment.status === 'completed' && (
                            <Button variant="contained" color="secondary" onClick={() => handleViewMaintenanceDetails(appointment.id)}>
                                Ver Detalle de Mantenimiento
                            </Button>
                        )}
                    </Paper>
                ))}
            </Box>
        </ViagioLayout>
    );
};
