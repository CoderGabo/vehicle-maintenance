import { TextField, Button, Box, FormControl, Select, InputLabel, MenuItem, Typography, SelectChangeEvent } from "@mui/material";
import { useForm } from "react-hook-form";
import { ViagioLayout } from "../../viagio/layout/ViagioLayout";
import { useState } from "react";
import { VehicleFormData } from "../../interface/vehicleFormData";

export const RegisterVehiclePage = () => {
    const { register, handleSubmit } = useForm<VehicleFormData>();
    const [selectedYear, setSelectedYear] = useState<string>(''); // Estado para el año seleccionado

    const years = Array.from({ length: 30 }, (_, i) => String(new Date().getFullYear() - i)); // Obtener los últimos 30 años

    const handleYearChange = (event: SelectChangeEvent<string>) => {
        if (typeof event.target.value === 'string') {
            setSelectedYear(event.target.value);
        }
    };

    const onSubmit = (data: VehicleFormData) => {
        console.log(data, selectedYear);
    };

    return (
        <ViagioLayout>
            <Typography variant="h4" gutterBottom sx={{ color: '#616161', ml: 3, mt: 2 }}>
                Registro de Vehículo
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        width: "50%",
                        margin: "auto",
                        marginTop: "20px",
                        padding: "20px",
                    }}
                >
                    <TextField
                        label="Marca"
                        id="marca"
                        {...register("marca")}
                        InputProps={{ style: { color: '#616161' } }}
                        InputLabelProps={{ style: { color: '#616161' } }} 
                    />
                    <TextField
                        label="Modelo"
                        id="modelo"
                        {...register("modelo")}
                        InputProps={{ style: { color: '#616161' } }}
                        InputLabelProps={{ style: { color: '#616161' } }} 
                    />
                    <TextField
                        label="Placa"
                        id="placa"
                        {...register("placa")}
                        InputProps={{ style: { color: '#616161' } }}
                        InputLabelProps={{ style: { color: '#616161' } }} 
                    />
                    <TextField
                        label="VIN"
                        id="vin"
                        {...register("vin")}
                        InputProps={{ style: { color: '#616161' } }}
                        InputLabelProps={{ style: { color: '#616161' } }} 
                    />
                    <FormControl sx={{ width: "100%" }}>
                        <InputLabel sx={{color: '#616161'}} id="year-label">Año de Creación</InputLabel>
                        <Select
                            labelId="year-label"
                            id="year"
                            value={selectedYear}
                            onChange={handleYearChange}
                            label="Año de Creación"
                            sx={{ color: '#616161' }}
                            
                        >
                            {years.map((year) => (
                                <MenuItem key={year} value={year}>
                                    {year}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button variant="contained" type="submit">
                        Enviar
                    </Button>
                </Box>
            </form>
        </ViagioLayout>
    );
};
