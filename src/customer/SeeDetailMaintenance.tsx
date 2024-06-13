import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Button,
  Alert,
  CircularProgress,
  CardHeader,
} from "@mui/material";
import { ViagioLayout } from "../viagio/layout/ViagioLayout";
import { GET_MAINTENANCE_BY_APPOINTMENT } from "../graphql/maintenances/queries-maintenances";
import { useQuery } from "@apollo/client";
import { Detail } from "../interface/detail.interface";

export const SeeDetailMaintenance = () => {
  const navigate = useNavigate();
  const { idCita } = useParams<{ idCita: string }>();
  const { data, error, loading } = useQuery(GET_MAINTENANCE_BY_APPOINTMENT, {
    variables: { appointmentId: idCita },
  });

  const maintenances = data?.maintenanceByAppointment;

  if (!idCita) {
    return <Typography>No se encontraron detalles para esta cita.</Typography>;
  }
  const totalCost = maintenances?.details.reduce(
    (total: number, detail: Detail) => total + detail.cost,
    0
  );

  const handleBackClick = () => {
    navigate("/mantenimientos/citas");
  };

  return (
    <ViagioLayout>
      <Box sx={{ p: 4 }}>
        {error && <Alert severity="error">{String(error)}</Alert>}

        {loading ? <CircularProgress /> : null}
        {maintenances && (
          <>
            {" "}
            <Typography variant="h5" gutterBottom sx={{ color: "#616161" }}>
              Cita para el vehículo {maintenances.vehicle.licensePlate}
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: "#616161" }}>
              Estado: {maintenances.status}
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ color: "#616161" }}
              >
                Detalle de Mantenimiento:
              </Typography>
              {maintenances.details.map((detail: Detail, index: number) => (
                <Card key={index} sx={{ mb: 2 }}>
                  <CardHeader title={"Servicio: " + detail.description} />
                  <CardContent>
                    <Typography>Bs {detail.cost}</Typography>
                  </CardContent>
                </Card>
              ))}
              <Divider sx={{ my: 2 }} />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <Typography variant="h6" sx={{ color: "#616161" }}>
                  Total a pagar:
                </Typography>
                <Typography variant="h6" sx={{ color: "#616161" }}>
                  Bs {totalCost}
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1" sx={{ mt: 4, color: "#616161" }}>
                Puede pasar a pagar el total del mantenimiento y recoger su
                vehículo en la empresa Viaggio.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleBackClick}
                sx={{ mt: 4 }}
              >
                Volver a citas de Mantenimiento
              </Button>
            </Box>
          </>
        )}
      </Box>
    </ViagioLayout>
  );
};
