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
import { GET_SERVICES_PAG } from "../graphql/services/queries-services";
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
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(isMediumScreen ? 6 : 8);

  const rowsPerPageOptions = isMediumScreen ? [6, 15, 30] : [8, 20, 30];

  useEffect(() => {
    setRowsPerPage(isMediumScreen ? 6 : 8);
  }, [isMediumScreen]);

  const {
    data,
    error: queryError,
    loading: queryLoading,
    refetch,
  } = useQuery(GET_SERVICES_PAG, {
    variables: {
      offset: page,
      limit: rowsPerPage,
    },
    fetchPolicy: "network-only",
  });

  console.log(data);
  const [deleteService, { loading: mutationLoading, error: mutationError }] =
    useMutation(DELETE_SERVICE, {
      // refetchQueries: [{ query: GET_SERVICES }],
      onCompleted: () => {
        //console.log("Service eliminado correctamente");
        refetch();
        setShowSuccessAlert(true);
        // Opcionalmente, puedes reiniciar el mensaje de éxito después de unos segundos
        setTimeout(() => setShowSuccessAlert(false), 3000);
      },
    });

  // console.log(data);

  const handleDeleteService = (serviceId: string) => {
    deleteService({
      variables: {
        serviceId,
      },
    });
  };
  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    console.log(newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
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
        <Alert severity="success">Servicio eliminado correctamente</Alert>
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
                data.servicesPag.data.map((service: ServiceFormData) => (
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
            count={data ? data.servicesPag.totalPages * rowsPerPage : 0}
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
