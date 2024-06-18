import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Card,
  CardHeader,
  TextField,
  CardContent,
  Alert,
} from "@mui/material";
import { ViagioLayout } from "../viagio/layout/ViagioLayout";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_MAINTENANCES_NOT_COMPLETED,
  GET_MAINTENANCE_BY_ID,
} from "../graphql/maintenances/queries-maintenances";
import {
  ADD_DETAILS,
  COMPLETED_STATUS,
} from "../graphql/maintenances/mutations-maintenances";
import { GET_SERVICES } from "../graphql/services/queries-services";
import { Service } from "../interface/service.interface";

export const SetDetailMaintenancePage = () => {
  const { idMantenimiento } = useParams<{ idMantenimiento: string }>();
  const [selectedServices, setSelectedServices] = useState<{
    [key: string]: { id: string; description: string };
  }>({});
  const [serviceCosts, setServiceCosts] = useState<{ [key: string]: number }>(
    {}
  );
  const [maintenanceDescription, setMaintenanceDescription] =
    useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const navigate = useNavigate();

  const { data: servicesData } = useQuery(GET_SERVICES);
  const services = useMemo(() => servicesData?.services || [], [servicesData]);

  const {
    data: maintenanceData,
    error,
    loading,
  } = useQuery(GET_MAINTENANCE_BY_ID, {
    variables: { id: idMantenimiento },
  });

  const result = useQuery(GET_MAINTENANCE_BY_ID, {
    variables: { id: idMantenimiento },
  });

  console.log(result);

  const maintenance = useMemo(
    () => maintenanceData?.maintenance || null,
    [maintenanceData]
  );
  console.log("error " + error);
  const [addDetails] = useMutation(ADD_DETAILS, {
    refetchQueries: [{ query: GET_MAINTENANCES_NOT_COMPLETED }],
  });

  const [completedStatus, { loading: statusLoading, error: statusError }] =
    useMutation(COMPLETED_STATUS, {
      refetchQueries: [{ query: GET_MAINTENANCES_NOT_COMPLETED }],
      onCompleted: () => {
        setShowSuccessAlert(true);
        setTimeout(() => setShowSuccessAlert(false), 4000);
        navigate("/mantenimientos/ver");
      },
    });

  const handleServiceChange = (service: Service) => {
    setSelectedServices((prev) => {
      const newSelectedServices = { ...prev };
      if (newSelectedServices[service.id]) {
        delete newSelectedServices[service.id];
      } else {
        newSelectedServices[service.id] = {
          id: service.id,
          description: service.name,
        };
      }
      return newSelectedServices;
    });
  };

  const handleCostChange = (serviceId: string, cost: number) => {
    if (!isNaN(cost)) {
      setServiceCosts((prev) => ({
        ...prev,
        [serviceId]: cost,
      }));
    }
  };

  // console.log(services);
  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = (): void => {
    setDialogOpen(false);
  };

  const handleRegisterServices = (): void => {
    addDetails({
      variables: {
        detailDtos: Object.values(selectedServices).map((service) => ({
          id: service.id,
          description: service.description,
          cost: serviceCosts[service.id] || 0,
        })),
        id: idMantenimiento,
      },
    });
    handleCloseDialog();
  };

  const handleMaintenanceEnd = (): void => {
    completedStatus({
      variables: {
        id: idMantenimiento,
        detailDtos: Object.values(selectedServices).map((service) => ({
          id: service.id,
          description: service.description,
          cost: serviceCosts[service.id] || 0,
        })),
        description: maintenanceDescription,
      },
    });
  };

  const calculateTotalCost = () => {
    let total = 0;
    for (const serviceId in selectedServices) {
      if (selectedServices[serviceId] && serviceCosts[serviceId]) {
        total += serviceCosts[serviceId];
      }
    }
    return total;
  };

  useEffect(() => {
    if (!loading && maintenance && maintenance.details && services.length > 0) {
      let costs: { [key: string]: number } = {};
      const initialSelectedServices = maintenance.details.reduce(
        (acc: any, item: any) => {
          console.log("item: " + item);
          const serviceFound = services.find(
            (service: any) => service.id === item.id
          );
          if (serviceFound) {
            acc[item.id] = {
              id: item.id,
              description: serviceFound.name,
            };
            costs = { ...costs, [item.id]: item.cost };
          }
          return acc;
        },
        {}
      );
      console.log("siiiii");
      console.log("intial value " + initialSelectedServices);
      setSelectedServices(initialSelectedServices);
      setServiceCosts(costs);
    } else {
      // Aquí puedes manejar el caso en que `maintenance.details` sea undefined o services aún no esté cargado
      console.log(
        "maintenance.details es undefined o services aún no está cargado"
      );
    }
  }, [services, maintenance, loading]);

  if (!idMantenimiento) {
    return <Typography>No se encontraron detalles para esta cita.</Typography>;
  }

  return (
    <ViagioLayout>
      {showSuccessAlert && (
        <Alert severity="success">Mantenimiento finalizado</Alert>
      )}
      {statusError && <Alert severity="error">{String(statusError)}</Alert>}
      {maintenance && (
        <Box sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom sx={{ color: "#616161" }}>
            Mantenimiento del vehículo {maintenance.vehicle.licensePlate}
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ color: "#616161" }}>
            Modelo: {maintenance.vehicle.model} Marca:{" "}
            {maintenance.vehicle.brand}
          </Typography>

          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenDialog}
            >
              Añadir Servicios
            </Button>

            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
              <DialogTitle>Seleccionar Servicios</DialogTitle>
              <DialogContent>
                {services.map((service: Service) => (
                  <Box key={service.id} sx={{ mb: 2 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            !!(selectedServices && selectedServices[service.id])
                          }
                          onChange={() => handleServiceChange(service)}
                        />
                      }
                      label={service.name}
                    />
                    <TextField
                      type="number"
                      label="Costo (Bs)"
                      value={serviceCosts[service.id] || ""}
                      onChange={(e) =>
                        handleCostChange(service.id, parseInt(e.target.value))
                      }
                      sx={{ mt: 1 }}
                    />
                  </Box>
                ))}
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleCloseDialog}
                  color="secondary"
                  variant="outlined"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleRegisterServices}
                  color="primary"
                  variant="contained"
                >
                  Registrar Servicios
                </Button>
              </DialogActions>
            </Dialog>

            <Box sx={{ mt: 4 }}>
              <Box sx={{ maxHeight: "400px", overflowY: "auto" }}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ color: "#616161" }}
                >
                  Servicios seleccionados:
                </Typography>
                {services
                  .filter((service: any) => selectedServices[service.id])
                  .map((service: any) => (
                    <Card key={service.id} sx={{ mb: 2 }}>
                      <CardHeader
                        title={service.name}
                        action={
                          <Checkbox
                            checked={!!selectedServices[service.id]}
                            onChange={() => handleServiceChange(service)}
                          />
                        }
                      />
                      <CardContent>
                        <TextField
                          label="Costo (Bs)"
                          value={serviceCosts[service.id] || ""}
                          onChange={(e) =>
                            handleCostChange(
                              service.id,
                              parseInt(e.target.value)
                            )
                          }
                          sx={{ mt: 1 }}
                        />
                      </CardContent>
                    </Card>
                  ))}
              </Box>
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
                  Bs {calculateTotalCost()}
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <TextField
                label="Descripción del mantenimiento"
                variant="outlined"
                fullWidth
                multiline
                defaultValue={
                  maintenance.description ? maintenance.description : ""
                }
                // value={maintenanceDescription}
                onChange={(e) => setMaintenanceDescription(e.target.value)}
                sx={{ mt: 2, color: "#616161" }}
                InputProps={{ style: { color: "#616161" } }}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                disabled={statusLoading}
                onClick={handleMaintenanceEnd}
              >
                {statusLoading ? "Enviando..." : "Finalizar Mantenimiento"}
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </ViagioLayout>
  );
};
