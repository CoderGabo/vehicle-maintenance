
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ViagioLayout } from '../../viagio/layout/ViagioLayout';

const rolesData = [
  { id: 1, nombre: 'Admin', descripcion: 'Rol de administrador', permisos: ['Crear usuario', 'Eliminar usuario', 'Editar usuario'] },
  { id: 2, nombre: 'Usuario', descripcion: 'Rol de usuario básico', permisos: ['Ver perfil', 'Editar perfil'] },
];

export const SeeRolPage = () => {
  const handleDelete = (id: number) => {
    // Lógica para eliminar el rol con el ID proporcionado
    console.log('Eliminar rol con ID:', id);
  };

  return (
    <ViagioLayout>
      <TableContainer sx={{ marginLeft: 2, marginTop: 3, overflowX: 'auto' }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Permisos</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rolesData.map((rol) => (
              <TableRow key={rol.id}>
                <TableCell>{rol.nombre}</TableCell>
                <TableCell>{rol.descripcion}</TableCell>
                <TableCell>{rol.permisos.join(', ')}</TableCell>
                <TableCell>
                  <IconButton color='secondary' onClick={() => handleDelete(rol.id)}>
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