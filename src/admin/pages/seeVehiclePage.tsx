import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
  Alert,
  CircularProgress,
  TablePagination,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { ViagioLayout } from "../../viagio/layout/ViagioLayout";
import { VehicleFormData } from "../../interface/vehicleFormData";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_VEHICLES_PAG } from "../../graphql/vehicles/queries-vehicles";
import { DELETE_VEHICLE } from "../../graphql/vehicles/mutations-vehicles";

export const SeeVehiclesPage = () => {
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
  } = useQuery(GET_VEHICLES_PAG, {
    variables: {
      offset: page * rowsPerPage,
      limit: rowsPerPage,
    },
  });
  const [deleteVehicle, { loading: mutationLoading, error: mutationError }] =
    useMutation(DELETE_VEHICLE, {
      // refetchQueries: [{ query: GET_VEHICLES }],
      onCompleted: () => {
        //console.log("vehiculo eliminado correctamente");
        refetch();
        setShowSuccessAlert(true);
        // Opcionalmente, puedes reiniciar el mensaje de éxito después de unos segundos
        setTimeout(() => setShowSuccessAlert(false), 3000);
      },
    });

  console.log(data);

  const handleDeleteVehicle = (vehicleId: string) => {
    deleteVehicle({
      variables: {
        vehicleId,
      },
    });
  };

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    // console.log(newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    //setPage(0);
  };

  return (
    <ViagioLayout>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "#616161", marginTop: 2, marginLeft: 3 }}
      >
        Vehículos Registrados
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
                <TableCell>Marca</TableCell>
                <TableCell>Modelo</TableCell>
                <TableCell>Placa</TableCell>
                <TableCell>VIN</TableCell>
                <TableCell>Año</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.vehiclesPag.data.map((vehicle: VehicleFormData) => (
                  <TableRow key={vehicle.id}>
                    <TableCell>{vehicle.brand}</TableCell>
                    <TableCell>{vehicle.model}</TableCell>
                    <TableCell>{vehicle.licensePlate}</TableCell>
                    <TableCell>{vehicle.vin}</TableCell>
                    <TableCell>{vehicle.year}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleDeleteVehicle(vehicle.id + "")}
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
            count={data ? data.vehiclesPag.totalPages * rowsPerPage : 0}
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
