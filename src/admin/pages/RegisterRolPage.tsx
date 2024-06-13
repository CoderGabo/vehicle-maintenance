import { SubmitHandler, useController, useForm } from "react-hook-form";
import {
  FormControl,
  FormGroup,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { RolFormData } from "../../interface/rolFormData";
import { ViagioLayout } from "../../viagio/layout/ViagioLayout";
import { CheckboxListWithSubMenu } from "../components/CheckboxListWithSubMenu";
import { useMutation } from "@apollo/client";
import { CREATE_ROLE } from "../../graphql/roles/mutations-roles";
import { GET_ROLES } from "../../graphql/roles/queries-roles";
import { useState } from "react";

export const RegisterRolPage = () => {
  const { handleSubmit, control } = useForm<RolFormData>({
    defaultValues: {
      name: "",
      description: "",
      permissions: [], // Inicializar permisos como un array vacío
    },
  });

  const { field: nombreField } = useController({ name: "name", control });
  const { field: descripcionField } = useController({
    name: "description",
    control,
  });

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const [createRole, { loading, error }] = useMutation(CREATE_ROLE, {
    refetchQueries: [{ query: GET_ROLES }],
    onCompleted: () => {
      //console.log("Role creado correctamente");
      setShowSuccessAlert(true);
      // Opcionalmente, puedes reiniciar el mensaje de éxito después de unos segundos
      setTimeout(() => setShowSuccessAlert(false), 3000);
    },
  });

  const onSubmitForm: SubmitHandler<RolFormData> = (data) => {
    createRole({
      variables: {
        roleDto: {
          name: data.name,
          description: data.description,
          permissions: data.permissions,
        },
      },
    });
  };

  return (
    <ViagioLayout>
      {showSuccessAlert && (
        <Alert severity="success">Rol creado correctamente</Alert>
      )}
      {error && <Alert severity="error">{String(error)}</Alert>}
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <FormControl fullWidth sx={{ pl: 4 }}>
          <TextField
            {...nombreField}
            label="Nombre"
            margin="normal"
            variant="outlined"
            InputLabelProps={{ sx: { color: "#616161" } }}
            InputProps={{ sx: { color: "#616161" } }}
          />
          <TextField
            {...descripcionField}
            label="Descripción"
            margin="normal"
            variant="outlined"
            multiline
            InputLabelProps={{ sx: { color: "#616161" } }}
            InputProps={{ sx: { color: "#616161" } }}
          />
          <FormGroup sx={{ maxHeight: "400px", overflowY: "auto" }}>
            <CheckboxListWithSubMenu control={control} />
          </FormGroup>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? "Enviando..." : "Registrar Rol"}
          </Button>
        </FormControl>
      </form>
    </ViagioLayout>
  );
};
