import { Typography, Button, Paper, Box } from "@mui/material";
import { ViagioLayout } from "../viagio/layout/ViagioLayout";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import {
  GET_MAINTENANCES,
  GET_MAINTENANCES_NOT_COMPLETED,
} from "../graphql/maintenances/queries-maintenances";

import { Maintenance } from "../interface/maintenance.interface";
import { useEffect, useState } from "react";

interface User {
  userId: string;
  username: string;
  token: string;
  role: any;
}
export const SeeMaintenancePage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);

  const { data: allMaintenances } = useQuery(GET_MAINTENANCES);
  const { data: maintenancesNotCompleted } = useQuery(
    GET_MAINTENANCES_NOT_COMPLETED
  );

  console.log(allMaintenances);

  const handleManageMaintenance = (id: string) => {
    // Aquí puedes implementar la lógica para gestionar el mantenimiento
    console.log(`Gestionando mantenimiento para el ID ${id}`);
    // id = 1 + "";
    navigate(`/mantenimiento/detalle/${id}`);
  };

  const getMaintenancesToDisplay = () => {
    let maintenances = [];
    if (user?.role.name === 'EMPLOYEE') {
      maintenances = maintenancesNotCompleted?.maintenancesNotCompleted || [];
    } else {
      maintenances = allMaintenances?.maintenances || [];
    }
    return maintenances;
  };

  const maintenancesToDisplay = getMaintenancesToDisplay();

  
  useEffect(() => {
    // Simulación de obtención de datos de localStorage
    const userData: User = JSON.parse(localStorage.getItem("user")|| "{}");

    setUser(userData);
  }, []);

  return (
    <ViagioLayout>
      <Box sx={{ mt: 4, paddingLeft: 4 }}>
        {maintenancesToDisplay &&
          maintenancesToDisplay.map((maintenance: Maintenance) => (
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
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleManageMaintenance(maintenance.id + "")}
              >
                Gestionar Mantenimiento
              </Button>
            </Paper>
          ))}
      </Box>
    </ViagioLayout>
  );
};

export default SeeMaintenancePage;
