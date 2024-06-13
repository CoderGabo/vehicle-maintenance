import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Alert,
  Typography,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ViagioLayout } from "../../viagio/layout/ViagioLayout";
import { GET_ROLES } from "../../graphql/roles/queries-roles";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_ROLE } from "../../graphql/roles/mutations-roles";
import { useState } from "react";
import { Role } from "../../interface/role.interface";

export const SeeRolPage = () => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const {
    data,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_ROLES);
  const [deleteUser, { loading: mutationLoading, error: mutationError }] =
    useMutation(DELETE_ROLE, {
      refetchQueries: [{ query: GET_ROLES }],
      onCompleted: () => {
        console.log("Role eliminado correctamente");
        setShowSuccessAlert(true);
        // Opcionalmente, puedes reiniciar el mensaje de éxito después de unos segundos
        setTimeout(() => setShowSuccessAlert(false), 3000);
      },
    });

  console.log(data);

  const handleDelete = (roleId: string) => {
    deleteUser({
      variables: {
        roleId,
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
        Roles
      </Typography>
      {showSuccessAlert && (
        <Alert severity="success">Rol eliminado correctamente</Alert>
      )}
      {queryError && <Alert severity="error">{String(queryError)}</Alert>}
      {mutationError && <Alert severity="error">{String(mutationError)}</Alert>}
      {queryLoading || mutationLoading ? (
        <CircularProgress />
      ) : (
        <TableContainer
          sx={{ marginLeft: 2, marginTop: 3, overflowX: "auto" }}
          component={Paper}
        >
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
              {data &&
                data.roles.map((rol: Role) => (
                  <TableRow key={rol.id}>
                    <TableCell>{rol.name}</TableCell>
                    <TableCell>{rol.description}</TableCell>
                    <TableCell>{rol.permissions?.join(", ")}</TableCell>
                    <TableCell>
                      <IconButton
                        color="secondary"
                        onClick={() => handleDelete(rol.id + "")}
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
