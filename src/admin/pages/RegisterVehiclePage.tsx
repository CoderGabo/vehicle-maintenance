import {
  TextField,
  Button,
  Box,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Typography,
  SelectChangeEvent,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { ViagioLayout } from "../../viagio/layout/ViagioLayout";
import { useState } from "react";
import { VehicleFormData } from "../../interface/vehicleFormData";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USERS } from "../../graphql/users/queries-users";
import { CREATE_VEHICLE } from "../../graphql/vehicles/mutations-vehicles";
// import { GET_VEHICLES } from "../../graphql/vehicles/queries-vehicles";
// import {instanceIA} from "../../utils/axiosConfig"
import { Role } from "../../interface/role.interface";

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  position?: string;
  role: Role;
  username: string;
}

export const RegisterVehiclePage = () => {
  const { register, handleSubmit } = useForm<VehicleFormData>();
  const [selectedYear, setSelectedYear] = useState<string>(""); // Estado para el año seleccionado
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { data } = useQuery(GET_USERS);
  // console.log(data.users);

  const years = Array.from({ length: 30 }, (_, i) =>
    String(new Date().getFullYear() - i)
  ); // Obtener los últimos 30 años

  const handleYearChange = (event: SelectChangeEvent<string>) => {
    if (typeof event.target.value === "string") {
      setSelectedYear(event.target.value);
    }
  };

  const handleUserChange = (event: SelectChangeEvent<string>) => {
    const userId = event.target.value;
    setSelectedUser(userId);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file && ["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const [createVehicle, { loading, error }] = useMutation(CREATE_VEHICLE, {
    //refetchQueries: [{ query: GET_VEHICLES }],
    onCompleted: () => {
      //console.log("Vehicle creado correctamente");
      setShowSuccessAlert(true);
      // Opcionalmente, puedes reiniciar el mensaje de éxito después de unos segundos
      setTimeout(() => setShowSuccessAlert(false), 3000);
    },
  });

  // const uploadFile = async (imageUrl: string) => {
  //   const data = {
  //     url_photo: imageUrl
  //   };
  //   console.log(data);

  //   try {
  //       const response = await instanceIA.post('generate_object3D', data, {
  //           headers: {
  //               'Content-Type': 'application/json'
  //           }
  //       });

  //       // Asegúrate de ajustar esto según la respuesta de tu API
  //       return response.data.url;
  //   } catch (error) {
  //       console.error('Error uploading file:', error);
  //       return null;
  //   }
  // };

  const onSubmit = async (data: VehicleFormData) => {
    console.log(data, selectedYear, selectedFile, selectedUser);

    // let fileUrl = null;
    // if (selectedFile) {
    //   fileUrl = await uploadFile('https://www.gac-motor.com/static/es/model/images/gs3/car-vehicle-color2.png');
    // }

    // if (!fileUrl) {
    //   console.error('File upload failed');
    //   return;
    // }

    createVehicle({
      variables: {
        vehicleDto: {
          licensePlate: data.licensePlate,
          brand: data.brand,
          model: data.model,
          year: parseInt(selectedYear),
          vin: data.vin,
          customerId: selectedUser,
        },
      },
    });
    // console.log(fileUrl);
  };

  return (
    <ViagioLayout>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "#616161", ml: 3, mt: 2 }}
      >
        Registro de Vehículo
      </Typography>
      {showSuccessAlert && (
        <Alert severity="success">Vehiculo registrado correctamente</Alert>
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
            marginTop: "20px",
            padding: "20px",
          }}
        >
          <TextField
            label="Marca"
            id="brand"
            {...register("brand")}
            InputProps={{ style: { color: "#616161" } }}
            InputLabelProps={{ style: { color: "#616161" } }}
          />
          <TextField
            label="Modelo"
            id="model"
            {...register("model")}
            InputProps={{ style: { color: "#616161" } }}
            InputLabelProps={{ style: { color: "#616161" } }}
          />
          <TextField
            label="Placa"
            id="licensePlate"
            {...register("licensePlate")}
            InputProps={{ style: { color: "#616161" } }}
            InputLabelProps={{ style: { color: "#616161" } }}
          />
          <TextField
            label="VIN"
            id="vin"
            {...register("vin")}
            InputProps={{ style: { color: "#616161" } }}
            InputLabelProps={{ style: { color: "#616161" } }}
          />
          <FormControl sx={{ width: "100%" }}>
            <InputLabel sx={{ color: "#616161" }} id="year-label">
              Año de Creación
            </InputLabel>
            <Select
              labelId="year-label"
              id="year"
              value={selectedYear}
              onChange={handleYearChange}
              label="Año de Creación"
              sx={{ color: "#616161" }}
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel sx={{ color: "#616161" }} id="user-label">
              Usuario
            </InputLabel>
            <Select
              labelId="user-label"
              id="user"
              value={selectedUser}
              onChange={handleUserChange}
              label="Usuario"
              sx={{ color: "#616161" }}
            >
              {data &&
                data.users.map((user: UserData) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.firstName} {user.lastName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            component="label"
            sx={{ color: "#616161", bgcolor: "#e0e0e0" }}
          >
            Subir Imagen
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              hidden
              onChange={handleFileChange}
            />
          </Button>
          {selectedFile && (
            <Typography variant="body2" sx={{ color: "#616161" }}>
              Archivo seleccionado: {selectedFile.name}
            </Typography>
          )}
          <Button variant="contained" type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Registrar"}
          </Button>
        </Box>
      </form>
    </ViagioLayout>
  );
};
