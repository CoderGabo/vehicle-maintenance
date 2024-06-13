import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { ViagioLayout } from "../viagio/layout/ViagioLayout";
import { GET_SERVICES } from "../graphql/services/queries-services";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { DELETE_SERVICE } from "../graphql/services/mutations-services";

// Define the structure of the service data
interface ServiceFormData {
  id: string;
  description: string;
  name: string;
}

export const SeeServicePage = () => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const {
    data,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_SERVICES);
  const [deleteService, { loading: mutationLoading, error: mutationError }] =
    useMutation(DELETE_SERVICE, {
      refetchQueries: [{ query: GET_SERVICES }],
      onCompleted: () => {
        //console.log("Service eliminado correctamente");
        setShowSuccessAlert(true);
        // Opcionalmente, puedes reiniciar el mensaje de éxito después de unos segundos
        setTimeout(() => setShowSuccessAlert(false), 3000);
      },
    });

  console.log(data);

  const handleDeleteService = (serviceId: string) => {
    deleteService({
      variables: {
        serviceId,
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
        Servicios Registrados
      </Typography>
      {showSuccessAlert && (
        <Alert severity="success">Rol eliminado correctamente</Alert>
      )}
      {queryError && <Alert severity="error">{String(queryError)}</Alert>}
      {mutationError && <Alert severity="error">{String(mutationError)}</Alert>}
      {queryLoading || mutationLoading ? (
        <CircularProgress />
      ) : (
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
              {data &&
                data.services.map((service: ServiceFormData) => (
                  <TableRow key={service.id}>
                    <TableCell>{service.name}</TableCell>
                    <TableCell>{service.description}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleDeleteService(service.id + "")}
                        color="secondary"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </ViagioLayout>
  );
};
