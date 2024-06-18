import {
  TextField,
  Button,
  Box,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";

import { FormData } from "../../interface/userFormData.interface";
import { ViagioLayout } from "../../viagio/layout/ViagioLayout";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ROLES } from "../../graphql/roles/queries-roles";
import { Role } from "../../interface/role.interface";
import { REGISTER_USER } from "../../graphql/users/mutations-users";
// import { GET_USERS } from "../../graphql/users/queries-users";

// Definir una interfaz para los permisos
// interface Rol {
//   value: string;
//   label: string;
// }

// // Datos estáticos de ejemplo para los permisos
// const roles: Rol[] = [
//   { value: "administrador", label: "Administrador" },
//   { value: "cliente", label: "Cliente" },
//   { value: "empleado", label: "Empleado" },
// ];

export const RegisterUserPage = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const [selectedRol, setSelectedRol] = useState<Role | null>(null);
  const { data: rolesData } = useQuery(GET_ROLES);

  const handlePermissionChange = (event: SelectChangeEvent<string>) => {
    const selectedId = event.target.value;
    const selectedRolObj = rolesData?.roles.find(
      (rol: Role) => rol.id === selectedId
    );
    if (selectedRolObj) {
      setSelectedRol(selectedRolObj);
    } else {
      setSelectedRol(null);
    }
  };

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const [registerUser, { loading, error }] = useMutation(REGISTER_USER, {
    // refetchQueries: [{ query: GET_USERS }],
    onCompleted: () => {
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 3000);
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data, selectedRol);
    registerUser({
      variables: {
        userDto: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          address: data.address,
          position: data.position,
          roleId: selectedRol?.id,
        },
        authDto: {
          username: data.username,
          password: data.password,
        },
      },
    });
  };

  return (
    <ViagioLayout>
      {showSuccessAlert && (
        <Alert severity="success">Usuario creado correctamente</Alert>
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
            marginTop: "50px", // Ajusta la distancia desde arriba
            padding: "20px",
          }}
        >
          <TextField
            label="Dirección"
            id="address"
            {...register("address")}
            InputProps={{ style: { color: "#616161" } }} // Establecer el color del texto
            InputLabelProps={{ style: { color: "#616161" } }}
          />
          <TextField
            label="Correo"
            id="username"
            type="email"
            {...register("email")}
            InputProps={{ style: { color: "#616161" } }} // Establecer el color del texto
            InputLabelProps={{ style: { color: "#616161" } }}
          />
          <TextField
            label="Nombre"
            id="firstName"
            {...register("firstName")}
            InputProps={{ style: { color: "#616161" } }} // Establecer el color del texto
            InputLabelProps={{ style: { color: "#616161" } }}
          />
          <TextField
            label="Apellido"
            id="lastName"
            {...register("lastName")}
            InputProps={{ style: { color: "#616161" } }} // Establecer el color del texto
            InputLabelProps={{ style: { color: "#616161" } }}
          />
          <TextField
            label="Teléfono"
            id="phone"
            type="tel"
            {...register("phone")}
            InputProps={{ style: { color: "#616161" } }} // Establecer el color del texto
            InputLabelProps={{ style: { color: "#616161" } }}
          />
          <TextField
            label="Nombre de Usuario"
            id="username"
            {...register("username")}
            InputProps={{ style: { color: "#616161" } }} // Establecer el color del texto
            InputLabelProps={{ style: { color: "#616161" } }}
          />
          <TextField
            label="Contraseña"
            id="password"
            type="password"
            {...register("password")}
            InputProps={{ style: { color: "#616161" } }} // Establecer el color del texto
            InputLabelProps={{ style: { color: "#616161" } }}
          />
          {/* Agregar Select de permisos */}
          <FormControl sx={{ width: "100%" }}>
            <InputLabel sx={{ color: "#616161" }} id="rol-label">
              Seleccionar Rol
            </InputLabel>
            <Select
              labelId="rol-label"
              id="rol"
              value={selectedRol?.id || ""}
              onChange={handlePermissionChange}
              label="Seleccionar Rol"
              sx={{ color: "#616161" }}
            >
              {rolesData &&
                rolesData.roles.map((rol: Role) => (
                  <MenuItem key={rol.id} value={rol.id}>
                    {rol.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          {selectedRol && selectedRol.name !== "customer" && (
            <TextField
              label="Cargo"
              id="position"
              {...register("position")}
              InputProps={{ style: { color: "#616161" } }}
              InputLabelProps={{ style: { color: "#616161" } }}
            />
          )}
          <Button variant="contained" type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Registrar"}
          </Button>
        </Box>
      </form>
    </ViagioLayout>
  );
};
