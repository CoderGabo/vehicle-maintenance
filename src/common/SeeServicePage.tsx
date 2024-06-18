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
  TablePagination,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { ViagioLayout } from "../viagio/layout/ViagioLayout";
import { GET_SERVICES } from "../graphql/services/queries-services";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { DELETE_SERVICE } from "../graphql/services/mutations-services";

// Define the structure of the service data
interface ServiceFormData {
  id: string;
  description: string;
  name: string;
}

export const SeeServicePage = () => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(isMediumScreen ? 6 : 8);

  const rowsPerPageOptions = isMediumScreen
  ? [6, 15, 30]
  : [8, 20, 30]

  useEffect(() => {
    setRowsPerPage(isMediumScreen ? 6 : 8);
  }, [isMediumScreen]);

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
  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null,  newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
                data.services
                  .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                  .map((service: ServiceFormData) => (
                    <TableRow key={service.id}>
                      <TableCell>{service.name}</TableCell>
                      <TableCell>{service.description}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleDeleteService(service.id)}
                          color="secondary"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={data ? data.services.length : 0}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={rowsPerPageOptions}
            labelRowsPerPage="Filas por página"
          />
        </Paper>
      )}
    </ViagioLayout>
  );
};
