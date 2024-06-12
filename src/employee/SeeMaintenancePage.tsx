import { Typography, Button, Paper, Box } from '@mui/material';
import { ViagioLayout } from '../viagio/layout/ViagioLayout';
import { useNavigate } from 'react-router-dom';

export const SeeMaintenancePage = () => {
    const navigate = useNavigate();

    // Datos de mantenimiento simulados
    const appointments = [
      {
          id: 1,
          vehicle: 'ABC123',
          services: [
              { name: 'Cambio de aceite' },
              { name: 'Cambio de llantas' },
              { name: 'Limpieza externa' },
          ],
      },
      {
          id: 2,
          vehicle: 'XYZ456',
          services: [
              { name: 'Revisión de frenos' },
              { name: 'Alineación y balanceo' },
              { name: 'Cambio de filtro de aire' },
          ],
      },
    ];

    const handleManageMaintenance = (id: number) => {
      // Aquí puedes implementar la lógica para gestionar el mantenimiento
      console.log(`Gestionando mantenimiento para el ID ${id}`);
      navigate(`/mantenimiento/detalle/${id}`)
  };

    return (
      <ViagioLayout>
        <Box sx={{ mt: 4, paddingLeft: 4 }}>
            {appointments.map((appointment, index) => (
                <Paper key={index} sx={{ p: 2, mt: 2 }}>
                    <Typography variant="h6">Vehículo: {appointment.vehicle}</Typography>
                    <Typography>Servicios:</Typography>
                    <ul>
                        {appointment.services.map((service, idx) => (
                            <li key={idx}>{service.name}</li>
                        ))}
                    </ul>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleManageMaintenance(appointment.id)}
                    >
                        Gestionar Mantenimiento
                    </Button>
                </Paper>
            ))}
        </Box>
      </ViagioLayout>
    );
};

export default SeeMaintenancePage;
