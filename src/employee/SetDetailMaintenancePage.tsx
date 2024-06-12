import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, FormControlLabel, Checkbox, Dialog, DialogTitle, DialogContent, DialogActions, Divider, Card, CardHeader, TextField, CardContent } from '@mui/material';
import { ViagioLayout } from '../viagio/layout/ViagioLayout';

interface Service {
    name: string;
    cost?: number; // Ahora cost es opcional
}

interface MaintenanceDetail {
    vehicle: string;
    licensePlate: string;
    model: string;
    brand: string;
    description: string;
    status: string;
}

interface MaintenanceDetailProps {
    [key: string]: MaintenanceDetail;
}

const maintenanceDetails: MaintenanceDetailProps = {
    '1': {
        vehicle: 'Vehículo XYZ',
        licensePlate: 'ABC-123',
        model: '2023',
        brand: 'Toyota',
        description: 'El cliente reporta un ruido extraño en el motor.',
        status: 'in-progress',
    },
    // Agrega más detalles de mantenimiento si es necesario
};

const serviceDetailsExample: Service[] = [
    { name: 'Cambio de aceite'},
    { name: 'Cambio de llantas'},
    // Agregar más detalles de servicios si es necesario
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

export const SetDetailMaintenancePage = () => {
    const { idMantenimiento } = useParams<{ idMantenimiento: string }>();
    const [selectedServices, setSelectedServices] = useState<{ [key: string]: boolean }>({});
    const [serviceCosts, setServiceCosts] = useState<{ [key: string]: number }>({});
    const [maintenanceDescription, setMaintenanceDescription] = useState<string>('');
    const [dialogOpen, setDialogOpen] = useState(false);

    if (!idMantenimiento || !maintenanceDetails[idMantenimiento]) {
        return <Typography>No se encontraron detalles para esta cita.</Typography>;
    }

    const appointmentDetails = maintenanceDetails[idMantenimiento];

    const handleServiceChange = (serviceName: string) => {
        setSelectedServices(prev => ({
            ...prev,
            [serviceName]: !prev[serviceName],
        }));
    };

    const handleCostChange = (serviceName: string, cost: number): void => {
        setServiceCosts(prev => ({
            ...prev,
            [serviceName]: cost,
        }));
    };

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = (): void => {
        setDialogOpen(false);
    };

    const handleRegisterServices = ():void => {
        // Aquí puedes agregar lógica para registrar los servicios seleccionados
        handleCloseDialog();
    };

    const handleMaintenanceEnd = (): void => {
        console.log(selectedServices, maintenanceDescription);
    }

    const calculateTotalCost = () => {
        let total = 0;
        for (const serviceName in selectedServices) {
            if (selectedServices[serviceName] && serviceCosts[serviceName]) {
                total += serviceCosts[serviceName];
            }
        }
        return total;
    };

    useEffect(() => {
        const initialSelectedServices: { [key: string]: boolean }  = {};
        availableServices.forEach(service => {
            const match = serviceDetailsExample.find(s => s.name === service.name);
            initialSelectedServices[service.name] = !!match;
        });
        setSelectedServices(initialSelectedServices);
    }, []);

    return (
        <ViagioLayout>
            <Box sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom sx={{ color: '#616161' }}>
                    Mantenimiento del vehículo {appointmentDetails.licensePlate}
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ color: '#616161' }}>
                    Modelo: {appointmentDetails.model} Marca: {appointmentDetails.brand}
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ color: '#616161' }}>
                    Descripción del cliente: {appointmentDetails.description}
                </Typography>

                <Box sx={{ mt: 4 }}>
                    <Button variant="contained" color="primary" onClick={handleOpenDialog}>
                        Añadir Servicios
                    </Button>

                    <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                        <DialogTitle>Seleccionar Servicios</DialogTitle>
                        <DialogContent>
                        {availableServices.map((service, index) => (
                            <Box key={index} sx={{ mb: 2 }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={!!selectedServices[service.name]}
                                            onChange={() => handleServiceChange(service.name)}
                                        />
                                    }
                                    label={service.name}
                                />
                                <TextField
                                    type="number"
                                    label="Costo (Bs)"
                                    value={serviceCosts[service.name] || ''}
                                    onChange={(e) => handleCostChange(service.name, parseInt(e.target.value))}
                                    sx={{ mt: 1 }}
                                />
                            </Box>
                        ))}
                    </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog} color="secondary" variant='outlined'>Cancelar</Button>
                            <Button onClick={handleRegisterServices} color="primary" variant='contained'>Registrar Servicios</Button>
                        </DialogActions>
                    </Dialog>

                    <Box sx={{ mt: 4 }}>
                        <Box sx={{ maxHeight: '400px', overflowY: 'auto' }}>
                            <Typography variant="subtitle1" gutterBottom sx={{ color: '#616161' }}>
                                Servicios seleccionados:
                            </Typography>
                            {/* Mostrar los nuevos servicios seleccionados por el empleado */}
                            {availableServices
                                .filter(service => selectedServices[service.name])
                                .map((service, index) => (
                                    <Card key={index} sx={{ mb: 2 }}>
                                        <CardHeader
                                            title={service.name}
                                            action={
                                                <Checkbox
                                                    checked={!!selectedServices[service.name]}
                                                    onChange={() => handleServiceChange(service.name)}
                                                />
                                            }
                                        />
                                        <CardContent>
                                            <TextField
                                                label="Costo (Bs)"
                                                value={serviceCosts[service.name] || ''}
                                                onChange={(e) => handleCostChange(service.name, parseInt(e.target.value))}
                                                sx={{ mt: 1 }}
                                            />
                                        </CardContent>
                                    </Card>
                            ))}
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                            <Typography variant="h6" sx={{ color: '#616161' }}>Total a pagar:</Typography>
                            <Typography variant="h6" sx={{ color: '#616161' }}>Bs {calculateTotalCost()}</Typography>
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <TextField
                            label="Descripción del mantenimiento"
                            variant="outlined"
                            fullWidth
                            multiline
                            value={maintenanceDescription}
                            onChange={(e) => setMaintenanceDescription(e.target.value)}
                            sx={{ mt: 2, color: '#616161' }}
                            InputProps={{style: {color: '#616161'}}}
                        />
                        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => handleMaintenanceEnd()}>
                            Finalizar Mantenimiento
                        </Button>
                    </Box>
                </Box>
            </Box>
        </ViagioLayout>
    );
};
