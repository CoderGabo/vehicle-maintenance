import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { ViagioLayout } from "../viagio/layout/ViagioLayout";
// import { GET_SERVICES } from "../graphql/services/queries-services";
import { CREATE_SERVICE } from "../graphql/services/mutations-services";
import { useState } from "react";
import { useMutation } from "@apollo/client";

interface ServiceFormData {
  description: string;
  name: string;
}

export const RegisterServicePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ServiceFormData>();

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const [createService, { loading, error }] = useMutation(CREATE_SERVICE, {
    // refetchQueries: [{ query: GET_SERVICES }],
    onCompleted: () => {
      //console.log("servicio creado correctamente");
      setShowSuccessAlert(true);
      // Opcionalmente, puedes reiniciar el mensaje de éxito después de unos segundos
      setTimeout(() => setShowSuccessAlert(false), 3000);
    },
  });

  const onSubmit = (data: ServiceFormData) => {
    createService({
      variables: {
        serviceDto: {
          name: data.name,
          description: data.description,
        },
      },
    });
  };

  return (
    <ViagioLayout>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "#616161", ml: 3, mt: 2 }}
      >
        Registro de Servicio
      </Typography>
      {showSuccessAlert && (
        <Alert severity="success">Servicio creado correctamente</Alert>
      )}
      {error && <Alert severity="error">{String(error)}</Alert>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "50%",
            margin: "auto",
            marginTop: "25px",
            padding: "5px",
          }}
        >
          <TextField
            label="Nombre"
            id="name"
            {...register("name", { required: "Este campo es requerido" })}
            error={!!errors.name}
            helperText={errors.name?.message}
            InputProps={{ style: { color: "#616161" } }}
            InputLabelProps={{ style: { color: "#616161" } }}
          />
          <TextField
            label="Descripción"
            id="description"
            {...register("description", {
              required: "Este campo es requerido",
            })}
            error={!!errors.description}
            helperText={errors.description?.message}
            InputProps={{ style: { color: "#616161" } }}
            InputLabelProps={{ style: { color: "#616161" } }}
          />
          <Button variant="contained" type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Registrar"}
          </Button>
        </Box>
      </form>
    </ViagioLayout>
  );
};
