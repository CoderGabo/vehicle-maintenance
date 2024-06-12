import { Typography, Table, TableHead, TableBody, TableRow, TableCell, Paper, IconButton, TableContainer } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { ViagioLayout } from '../../viagio/layout/ViagioLayout';

// Definir una interfaz para los datos de usuario
interface UserData {
    direccion: string;
    correo: string;
    nombre: string;
    apellido: string;
    telefono: string;
    rol: string;
    posicion?: string;
}

// Datos estáticos de ejemplo para los usuarios
const users: UserData[] = [
    {
        direccion: "Calle 123",
        correo: "usuario1@example.com",
        nombre: "Juan",
        apellido: "Pérez",
        telefono: "1234567890",
        rol: "cliente"
    },
    {
        direccion: "Avenida 456",
        correo: "usuario2@example.com",
        nombre: "María",
        apellido: "González",
        telefono: "0987654321",
        rol: "admin"
    },
    {
        direccion: "Avenida 456",
        correo: "usuario2@example.com",
        nombre: "María",
        apellido: "González",
        telefono: "0987654321",
        rol: "empleado",
        posicion: "Jefe de Mecanicos"
    },
    // Agregar más usuarios si es necesario
];

export const SeeUsersPage = () => {

    const handleDeleteUser = (index: number) => {
        // Implementa la lógica para eliminar el usuario con el índice especificado
        console.log("Eliminar usuario en el índice:", index);
    };

    return (
        <ViagioLayout>
            <Typography variant="h4" gutterBottom sx={{color: '#616161', marginTop: 2, marginLeft: 3}}>
                Usuarios Registrados
            </Typography>
            <TableContainer component={Paper} sx={{ml:2, mt: 2, marginLeft: 3, maxWidth: '90vw', overflowX: 'auto'}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Dirección</TableCell>
                            <TableCell>Correo</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Apellido</TableCell>
                            <TableCell>Teléfono</TableCell>
                            <TableCell>Rol</TableCell> 
                            <TableCell>Posición</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user, index) => (
                            <TableRow key={index}>
                                <TableCell>{user.direccion}</TableCell>
                                <TableCell>{user.correo}</TableCell>
                                <TableCell>{user.nombre}</TableCell>
                                <TableCell>{user.apellido}</TableCell>
                                <TableCell>{user.telefono}</TableCell>
                                <TableCell>{user.rol}</TableCell> 
                                <TableCell>{user.rol === 'empleado' ? user.posicion : '-'}</TableCell> 
                                <TableCell>
                                    <IconButton onClick={() => handleDeleteUser(index)} color="secondary">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </ViagioLayout>
    );
};
