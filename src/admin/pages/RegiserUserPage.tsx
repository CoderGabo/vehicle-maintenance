import { TextField, Button, Box, FormControl, Select, InputLabel, MenuItem, SelectChangeEvent } from "@mui/material";
import { useForm } from "react-hook-form";

import { FormData } from "../../interface/userFormData.interface";
import { ViagioLayout } from "../../viagio/layout/ViagioLayout";
import { useState } from "react";

// Definir una interfaz para los permisos
interface Rol {
    value: string;
    label: string;
}

// Datos estáticos de ejemplo para los permisos
const roles: Rol[] = [
    { value: "administrador", label: "Administrador" },
    { value: "cliente", label: "Cliente" },
    { value: "empleado", label: "Empleado" },
];

export const RegisterUserPage = () => {
    const { register, handleSubmit } = useForm<FormData>();
    const [selectedRol, setSelectedRol] = useState<{ value: string; } | "" | undefined>("");

    const handlePermissionChange = (event: SelectChangeEvent<{ value: string }>) => {
        const selectedValue = event.target.value;
        if (typeof selectedValue === 'string') {
            setSelectedRol({ value: selectedValue });
        } else if (selectedValue && typeof selectedValue === 'object' && 'value' in selectedValue) {
            setSelectedRol(selectedValue);
        } else {
            setSelectedRol("");
        }
    };

    const onSubmit = (data: FormData) => {
        console.log(data, selectedRol);
    };

    return (
        <ViagioLayout>
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
                    id="direccion"
                    {...register("direccion")}
                    InputProps={{ style: { color: '#616161' } }} // Establecer el color del texto
                    InputLabelProps={{ style: { color: '#616161' } }} 
                />
                <TextField
                    label="Correo"
                    id="correo"
                    type="email"
                    {...register("correo")}
                    InputProps={{ style: { color: '#616161' } }} // Establecer el color del texto
                    InputLabelProps={{ style: { color: '#616161' } }} 
                />
                <TextField
                    label="Nombre"
                    id="nombre"
                    {...register("nombre")}
                    InputProps={{ style: { color: '#616161' } }} // Establecer el color del texto
                    InputLabelProps={{ style: { color: '#616161' } }} 
                />
                <TextField
                    label="Apellido"
                    id="apellido"
                    {...register("apellido")}
                    InputProps={{ style: { color: '#616161' } }} // Establecer el color del texto
                    InputLabelProps={{ style: { color: '#616161' } }} 
                />
                <TextField
                    label="Teléfono"
                    id="telefono"
                    type="tel"
                    {...register("telefono")}
                    InputProps={{ style: { color: '#616161'} }} // Establecer el color del texto
                    InputLabelProps={{ style: { color: '#616161' } }} 
                />
                <TextField
                    label="Nombre de Usuario"
                    id="username"
                    {...register("username")}
                    InputProps={{ style: { color: '#616161'} }} // Establecer el color del texto
                    InputLabelProps={{ style: { color: '#616161' } }} 
                />
                <TextField
                    label="Contraseña"
                    id="password"
                    type="password"
                    {...register("password")}
                    InputProps={{ style: { color: '#616161'} }} // Establecer el color del texto
                    InputLabelProps={{ style: { color: '#616161' } }} 
                />
                {/* Agregar Select de permisos */}
                <FormControl sx={{ width: "100%" }}>
                    <InputLabel sx={{color: '#616161'}} id="rol-label">Seleccionar Rol</InputLabel>
                    <Select
                        labelId="rol-label"
                        id="rol"
                        value={selectedRol}
                        onChange={handlePermissionChange}
                        label="Seleccionar Rol"
                        renderValue={(selected) => selected.value}
                        sx={{ color: '#616161' }} // Establecer el color del texto
                    >
                        {roles.map(rol => (
                            <MenuItem key={rol.value} value={rol.value}>
                                {rol.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {selectedRol && selectedRol.value === "empleado" && (
                    <TextField
                        label="Cargo"
                        id="cargo"
                        {...register("cargo")}
                        InputProps={{ style: { color: '#616161' } }} // Establecer el color del texto
                        InputLabelProps={{ style: { color: '#616161' } }} 
                    />
                )}
                <Button variant="contained" type="submit">Enviar</Button>
            </Box>
            </form>
        </ViagioLayout>
    );
};
