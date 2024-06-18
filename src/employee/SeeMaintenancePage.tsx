import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Paper,
  Box,
  Pagination,
  Alert,
  CircularProgress,
} from "@mui/material";
import { ViagioLayout } from "../viagio/layout/ViagioLayout";
import { useQuery } from "@apollo/client";
import {
  GET_MAINTENANCES_NOT_COMPLETED_PAG,
  GET_MAINTENANCES_PAG,
} from "../graphql/maintenances/queries-maintenances";

import { Maintenance } from "../interface/maintenance.interface";
import { Role } from "../interface/role.interface";

interface User {
  userId: string;
  username: string;
  token: string;
  role: Role;
}

const rowsPerPage = 4;

export const SeeMaintenancePage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [page, setPage] = useState(1); // Estado para la página actual

  const {
    data: allMaintenances,
    loading: isLoading,
    error: queryError,
  } = useQuery(GET_MAINTENANCES_PAG, {
    variables: {
      offset: (page - 1),
      limit: rowsPerPage,
    },
    fetchPolicy: "network-only",
  });
  
  const { data: maintenancesNotCompleted } = useQuery(
    GET_MAINTENANCES_NOT_COMPLETED_PAG,
    {
      variables: {
        offset: (page - 1),
        limit: rowsPerPage,
      },
      fetchPolicy: 'network-only',
    }
  );

  const handleManageMaintenance = (id: string) => {
    // Aquí puedes implementar la lógica para gestionar el mantenimiento
    console.log(`Gestionando mantenimiento para el ID ${id}`);
    // id = 1 + "";
    navigate(`/mantenimiento/detalle/${id}`);
  };

  const getMaintenancesToDisplay = () => {
    let maintenances = [];
    if (user?.role.name === "EMPLOYEE") {
      maintenances =
        maintenancesNotCompleted?.maintenancesNotCompletedPag || [];
    } else {
      maintenances = allMaintenances?.maintenancesPag || [];
    }
    return maintenances;
  };

  const maintenancesToDisplay = getMaintenancesToDisplay();
  console.log(maintenancesToDisplay);

  useEffect(() => {
    // Simulación de obtención de datos de localStorage
    const userData: User = JSON.parse(localStorage.getItem("user") || "{}");

    setUser(userData);
  }, []);

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    console.log(value);
    setPage(value);
  };

  return (
    <ViagioLayout>
      {queryError && <Alert severity="error">{String(queryError)}</Alert>}
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box sx={{ mt: 4, paddingLeft: 4 }}>
          {maintenancesToDisplay &&
            maintenancesToDisplay.data?.map((maintenance: Maintenance) => (
              <Paper key={maintenance.id} sx={{ p: 2, mt: 2 }}>
                <Typography variant="h6">
                  Vehículo: {maintenance.vehicle.licensePlate}
                </Typography>
                <Typography>Servicios:</Typography>
                <ul>
                  {maintenance.details?.map((detail, idx) => (
                    <li key={idx}>{detail.description}</li>
                  ))}
                </ul>
                <Typography>Estado: {maintenance.status}</Typography>

                {maintenance.status !== 'completed' && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleManageMaintenance(maintenance.id + "")}
                  >
                    Gestionar Mantenimiento
                  </Button>
                )}
                
              </Paper>
            ))}
          <Box mt={4} sx={{ display: "flex", justifyContent: "center" }}>
            <Pagination
              count={
                maintenancesToDisplay ? maintenancesToDisplay.totalPages : 0
              }
              page={page}
              onChange={handleChangePage}
              color="secondary"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#616161",
                },
              }}
            />
          </Box>
        </Box>
      )}
    </ViagioLayout>
  );
};

export default SeeMaintenancePage;
