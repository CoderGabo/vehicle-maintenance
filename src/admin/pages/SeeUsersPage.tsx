import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
  TableContainer,
  CircularProgress,
  Alert,
  TablePagination,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { ViagioLayout } from "../../viagio/layout/ViagioLayout";
import { useEffect, useState } from "react";
import { Role } from "../../interface/role.interface";

// Definir una interfaz para los datos de usuario
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

const usersData = [
  { id: '1', firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '123-456-7890', address: '123 Main St', position: 'Manager', role: { name: 'Admin' }, username: 'johndoe' },
  { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phone: '234-567-8901', address: '456 Elm St', position: 'Developer', role: { name: 'User' }, username: 'janesmith' },
  { id: '3', firstName: 'Alice', lastName: 'Johnson', email: 'alice.johnson@example.com', phone: '345-678-9012', address: '789 Pine St', position: 'Designer', role: { name: 'Editor' }, username: 'alicejohnson' },
  { id: '4', firstName: 'Bob', lastName: 'Brown', email: 'bob.brown@example.com', phone: '456-789-0123', address: '321 Oak St', position: 'Tester', role: { name: 'Moderator' }, username: 'bobbrown' },
  { id: '5', firstName: 'Charlie', lastName: 'Davis', email: 'charlie.davis@example.com', phone: '567-890-1234', address: '654 Cedar St', position: 'Support', role: { name: 'Viewer' }, username: 'charliedavis' },
  { id: '6', firstName: 'David', lastName: 'Wilson', email: 'david.wilson@example.com', phone: '678-901-2345', address: '987 Birch St', position: 'HR', role: { name: 'Contributor' }, username: 'davidwilson' },
  { id: '7', firstName: 'Ella', lastName: 'Martinez', email: 'ella.martinez@example.com', phone: '789-012-3456', address: '432 Spruce St', position: 'Analyst', role: { name: 'Manager' }, username: 'ellamartinez' },
  { id: '8', firstName: 'Frank', lastName: 'Garcia', email: 'frank.garcia@example.com', phone: '890-123-4567', address: '123 Willow St', position: 'Operator', role: { name: 'Operator' }, username: 'frankgarcia' },
  { id: '9', firstName: 'Grace', lastName: 'Lopez', email: 'grace.lopez@example.com', phone: '901-234-5678', address: '456 Maple St', position: 'Supervisor', role: { name: 'Supervisor' }, username: 'gracelopez' },
  { id: '10', firstName: 'Hank', lastName: 'Lee', email: 'hank.lee@example.com', phone: '012-345-6789', address: '789 Redwood St', position: 'Consultant', role: { name: 'Assistant' }, username: 'hanklee' },
  { id: '11', firstName: 'Ivy', lastName: 'King', email: 'ivy.king@example.com', phone: '123-456-7890', address: '321 Poplar St', position: 'Intern', role: { name: 'Analyst' }, username: 'ivyking' },
  { id: '12', firstName: 'Jack', lastName: 'Wright', email: 'jack.wright@example.com', phone: '234-567-8901', address: '654 Fir St', position: 'Engineer', role: { name: 'Consultant' }, username: 'jackwright' },
  { id: '13', firstName: 'Kate', lastName: 'Hill', email: 'kate.hill@example.com', phone: '345-678-9012', address: '987 Ash St', position: 'Sales', role: { name: 'Developer' }, username: 'katehill' },
  { id: '14', firstName: 'Liam', lastName: 'Scott', email: 'liam.scott@example.com', phone: '456-789-0123', address: '123 Maple St', position: 'Marketing', role: { name: 'Tester' }, username: 'liamscott' },
  { id: '15', firstName: 'Mia', lastName: 'Adams', email: 'mia.adams@example.com', phone: '567-890-1234', address: '456 Pine St', position: 'Customer Service', role: { name: 'Support' }, username: 'miaadams' },
];

export const SeeUsersPage = () => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(isMediumScreen ? 6 : 8);

  useEffect(() => {
    setRowsPerPage(isMediumScreen ? 6 : 8);
  }, [isMediumScreen]);

  const rowsPerPageOptions = isMediumScreen
  ? [6, 15, 30]
  : [8, 20, 30]

  // const {
  //   data,
  //   error: queryError,
  //   loading: queryLoading,
  // } = useQuery(GET_USERS);
  // const [deleteUser, { loading: mutationLoading, error: mutationError }] =
  //   useMutation(DELETE_USER, {
  //     refetchQueries: [{ query: GET_USERS }],
  //     onCompleted: () => {
  //       console.log("Usuario eliminado correctamente");
  //       setShowSuccessAlert(true);
  //       // Opcionalmente, puedes reiniciar el mensaje de éxito después de unos segundos
  //       setTimeout(() => setShowSuccessAlert(false), 3000);
  //     },
  //   });

  // const handleDeleteUser = (userId: string) => {
  //   deleteUser({
  //     variables: {
  //       userId,
  //     },
  //   });
  // };

  // Simulamos la consulta de datos
  const data = { users: usersData };
  const queryLoading = false;
  const queryError = null;
  const mutationLoading = false;
  const mutationError = null;

  const handleDeleteUser = (userId: string) => {
    console.log(`Eliminar usuario con id: ${userId}`);
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 3000);
  };

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null,  newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <ViagioLayout>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "#616161", marginLeft: 3 }}
      >
        Usuarios Registrados
      </Typography>
      {showSuccessAlert && (
        <Alert severity="success">Usuario eliminado correctamente</Alert>
      )}
      {queryError && <Alert severity="error">{String(queryError)}</Alert>}
      {mutationError && <Alert severity="error">{String(mutationError)}</Alert>}
      {queryLoading || mutationLoading ? (
        <CircularProgress />
      ) : (
        <>
          <TableContainer
            component={Paper}
            sx={{
              ml: 2,
              mt: 2,
              marginLeft: 3,
              maxWidth: "90vw",
              overflowX: "auto",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Dirección</TableCell>
                  <TableCell>Nombre de Usuario</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Apellido</TableCell>
                  <TableCell>Teléfono</TableCell>
                  <TableCell>Rol</TableCell>
                  <TableCell>Posición</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  data.users
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user: UserData) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.address}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.firstName}</TableCell>
                      <TableCell>{user.lastName}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{user.role.name}</TableCell>
                      <TableCell>
                        {user.role.name === "empleado"
                          ? user.position ?? "-"
                          : "-"}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleDeleteUser(user.id)}
                          color="secondary"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={data ? data.users.length : 0}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={rowsPerPageOptions}
            labelRowsPerPage="Filas por página"
            sx={{ color: "#616161" }}
          />
        </>
      )}
    </ViagioLayout>
  );
};
