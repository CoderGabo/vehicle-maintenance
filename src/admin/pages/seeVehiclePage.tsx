import { Typography, Table, TableHead, TableBody, TableRow, TableCell, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { ViagioLayout } from '../../viagio/layout/ViagioLayout';
import { VehicleFormData } from '../../interface/vehicleFormData';

// Datos estáticos de ejemplo para los vehículos
const vehicles: VehicleFormData[] = [
    {
        marca: "Toyota",
        modelo: "Corolla",
        placa: "ABC123",
        vin: "1234567890",
        anio: "2020"
    },
    {
        marca: "Honda",
        modelo: "Civic",
        placa: "DEF456",
        vin: "0987654321",
        anio: "2019"
    },
    // Agregar más vehículos si es necesario
];

export const SeeVehiclesPage = () => {

    const handleDeleteVehicle = (index: number) => {
        // Implementa la lógica para eliminar el vehículo con el índice especificado
        console.log("Eliminar vehículo en el índice:", index);
    };

    return (
        <ViagioLayout>
            <Typography variant="h4" gutterBottom sx={{color: '#616161', marginTop: 2, marginLeft: 3}}>
                Vehículos Registrados
            </Typography>
            <Paper sx={{ml:3, mt: 2}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Marca</TableCell>
                            <TableCell>Modelo</TableCell>
                            <TableCell>Placa</TableCell>
                            <TableCell>VIN</TableCell>
                            <TableCell>Año</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vehicles.map((vehicle, index) => (
                            <TableRow key={index}>
                                <TableCell>{vehicle.marca}</TableCell>
                                <TableCell>{vehicle.modelo}</TableCell>
                                <TableCell>{vehicle.placa}</TableCell>
                                <TableCell>{vehicle.vin}</TableCell>
                                <TableCell>{vehicle.anio}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleDeleteVehicle(index)} color="secondary">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </ViagioLayout>
    );
};
