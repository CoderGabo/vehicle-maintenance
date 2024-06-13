import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  Alert,
  CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../graphql/users/mutations-users";
import { useNavigate } from "react-router-dom";

const data = {
  login: {
    id: "12345",
    username: "usuario_prueba",
    token: "mi_token_secreto",
    role: "admin"
  }
};

export const LoginPage = () => {
  const navigate = useNavigate();
  const [login, { loading, error }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      // Asegúrate de que este código se ejecuta solo después de que la mutación se haya completado con éxito.
      localStorage.setItem(
        "user",
        JSON.stringify({
          userId: data.login.id,
          username: data.login.username,
          token: data.login.token,
          role: data.login.role,
        })
      );
      navigateToCorrectRoute();
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const dataform = new FormData(event.currentTarget);
    login({
      variables: {
        authDto: {
          username: dataform.get("username"),
          password: dataform.get("password"),
        },
      },
    });

    localStorage.setItem(
      "user",
      JSON.stringify({
        userId: data.login.id,
        username: data.login.username,
        token: data.login.token,
        role: data.login.role,
      })
    );

    navigateToCorrectRoute();
  };

  const navigateToCorrectRoute = () => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
  
    switch (userData.role) {
      case "customer":
        navigate("/mantenimientos/citas");
        break;
      case "employee":
        navigate("/mantenimientos/ver");
        break;
      case "admin":
        navigate("/dashboard");
        break;
      default:
        console.error("Rol no reconocido:", userData.role);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {loading && <CircularProgress />}
        {error && <Alert severity="error">{String(error)}</Alert>}
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography sx={{ color: "#616161" }} component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Nombre de Usuario"
            name="username"
            autoComplete="username"
            autoFocus
            InputLabelProps={{ sx: { color: "#616161" } }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            InputLabelProps={{ sx: { color: "#616161" } }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Iniciar Sesión
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                ¿Olvidaste tu contraseña?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
