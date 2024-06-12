import { TextField, Button, Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { ViagioLayout } from "../viagio/layout/ViagioLayout";

interface ServiceFormData {
    description: string;
    name: string;
}

export const RegisterServicePage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ServiceFormData>();

    const onSubmit = (data: ServiceFormData) => {
        console.log(data);
    };

    return (
        <ViagioLayout>
            <Typography variant="h4" gutterBottom sx={{ color: '#616161', ml: 3, mt: 2 }}>
                Registro de Servicio
            </Typography>
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
                        InputProps={{ style: { color: '#616161' } }}
                        InputLabelProps={{ style: { color: '#616161' } }} 
                    />
                    <TextField
                        label="Descripción"
                        id="description"
                        {...register("description", { required: "Este campo es requerido" })}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                        InputProps={{ style: { color: '#616161'} }}
                        InputLabelProps={{ style: { color: '#616161' } }} 
                    />
                    <Button variant="contained" type="submit">
                        Enviar
                    </Button>
                </Box>
            </form>
        </ViagioLayout>
    );
};
