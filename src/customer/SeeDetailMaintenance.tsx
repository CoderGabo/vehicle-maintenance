import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardContent, CardHeader, Divider, Button } from '@mui/material';
import { ViagioLayout } from '../viagio/layout/ViagioLayout';

interface Service {
    name: string;
    cost: number;
    description: string;
}

interface MaintenanceDetail {
    vehicle: string;
    status: string;
    services: Service[];
}

interface MaintenanceDetailProps {
    [key: string]: MaintenanceDetail;
}
// Simulación de datos de mantenimiento
const maintenanceDetails: MaintenanceDetailProps = {
    1: {
        vehicle: 'Vehículo XYZ',
        status: 'completed',
        services: [
            { name: 'Cambio de aceite', cost: 150, description: 'Cambio de aceite del motor con aceite sintético.' },
            { name: 'Cambio de llantas', cost: 500, description: 'Reemplazo de las cuatro llantas del vehículo.' },
            { name: 'Limpieza externa', cost: 300, description: 'Limpieza completa del exterior del vehículo.' },
        ],
    },
    // Puedes añadir más datos de ejemplo aquí
};

export const SeeDetailMaintenance = () => {
    const navigate = useNavigate();
    const { idMantenimiento } = useParams<{ idMantenimiento: string }>();
    if (!idMantenimiento || !maintenanceDetails[idMantenimiento]) {
        return <Typography>No se encontraron detalles para esta cita.</Typography>;
    }

    const appointmentDetails = maintenanceDetails[idMantenimiento];
    const totalCost = appointmentDetails?.services.reduce((total, service) => total + service.cost, 0);

    const handleBackClick = () => {
        navigate('/mantenimientos/citas');
    };

    return (
        <ViagioLayout>
            <Box sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom sx={{color: '#616161'}}>Cita para el vehículo {appointmentDetails.vehicle}</Typography>
                <Typography variant="h6" gutterBottom sx={{color: '#616161'}}>Estado: {appointmentDetails.status}</Typography>

                <Box sx={{ mt: 4 }}>
                    <Typography variant="subtitle1" gutterBottom sx={{color: '#616161'}}>Detalle de Mantenimiento:</Typography>
                    {appointmentDetails.services.map((service, index) => (
                        <Card key={index} sx={{ mb: 2 }}>
                            <CardHeader title={service.name} />
                            <CardContent>
                                <Typography>Descripción: {service.description}</Typography>
                                <Typography>Bs {service.cost}</Typography>
                            </CardContent>
                        </Card>
                    ))}
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                        <Typography variant="h6" sx={{color: '#616161'}}>Total a pagar:</Typography>
                        <Typography variant="h6" sx={{color: '#616161'}}>Bs {totalCost}</Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body1" sx={{ mt: 4, color: '#616161' }}>
                        Puede pasar a pagar el total del mantenimiento y recoger su vehículo en la empresa Viaggio.
                    </Typography>
                    <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleBackClick} 
                    sx={{ mt: 4 }}
                    >
                        Volver a citas de Mantenimiento
                    </Button>
                </Box>
            </Box>
        </ViagioLayout>
    );
};
