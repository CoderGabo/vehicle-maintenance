import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
  TableContainer,
  CircularProgress,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { ViagioLayout } from "../../viagio/layout/ViagioLayout";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USERS } from "../../graphql/users/queries-users";
import { DELETE_USER } from "../../graphql/users/mutations-users";
import { useState } from "react";
import { Role } from "../../interface/role.interface";

// Definir una interfaz para los datos de usuario
interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  position?: string;
  role: Role;
  username: string;
}

export const SeeUsersPage = () => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const {
    data,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_USERS);
  const [deleteUser, { loading: mutationLoading, error: mutationError }] =
    useMutation(DELETE_USER, {
      refetchQueries: [{ query: GET_USERS }],
      onCompleted: () => {
        console.log("Usuario eliminado correctamente");
        setShowSuccessAlert(true);
        // Opcionalmente, puedes reiniciar el mensaje de éxito después de unos segundos
        setTimeout(() => setShowSuccessAlert(false), 3000);
      },
    });

  const handleDeleteUser = (userId: string) => {
    deleteUser({
      variables: {
        userId,
      },
    });
  };
  return (
    <ViagioLayout>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "#616161", marginTop: 2, marginLeft: 3 }}
      >
        Usuarios Registrados
      </Typography>
      {showSuccessAlert && (
        <Alert severity="success">Usuario eliminado correctamente</Alert>
      )}
      {queryError && <Alert severity="error">{String(queryError)}</Alert>}
      {mutationError && <Alert severity="error">{String(mutationError)}</Alert>}
      {queryLoading || mutationLoading ? (
        <CircularProgress />
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            ml: 2,
            mt: 2,
            marginLeft: 3,
            maxWidth: "90vw",
            overflowX: "auto",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Dirección</TableCell>
                <TableCell>Nombre de Usuario</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellido</TableCell>
                <TableCell>Teléfono</TableCell>
                <TableCell>Rol</TableCell>
                <TableCell>Posición</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.users.map((user: UserData) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.address}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.role.name}</TableCell>
                    <TableCell>
                      {user.role.name === "empleado"
                        ? user.position ?? "-"
                        : "-"}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleDeleteUser(user.id)}
                        color="secondary"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </ViagioLayout>
  );
};
