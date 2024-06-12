import { Typography, Table, TableHead, TableBody, TableRow, TableCell, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { ViagioLayout } from '../viagio/layout/ViagioLayout';

// Define the structure of the service data
interface ServiceFormData {
    description: string;
    name: string;
}

// Example static data for services
const services: ServiceFormData[] = [
    {
        description: "Service description 1",
        name: "Service 1"
    },
    {
        description: "Service description 2",
        name: "Service 2"
    },
    // Add more services as needed
];

export const SeeServicePage = () => {

    const handleDeleteService = (index: number) => {
        // Implement the logic to delete the service with the specified index
        console.log("Delete service at index:", index);
    };

    return (
        <ViagioLayout>
            <Typography variant="h4" gutterBottom sx={{ color: '#616161', marginTop: 2, marginLeft: 3 }}>
                Servicios Registrados
            </Typography>
            <Paper sx={{ ml: 3, mt: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {services.map((service, index) => (
                            <TableRow key={index}>
                                <TableCell>{service.name}</TableCell>
                                <TableCell>{service.description}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleDeleteService(index)} color="secondary">
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
