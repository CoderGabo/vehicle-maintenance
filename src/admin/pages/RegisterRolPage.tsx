import { SubmitHandler, useController, useForm } from 'react-hook-form';
import { FormControl, FormGroup, TextField, Button } from '@mui/material';
import { RolFormData } from '../../interface/rolFormData';
import { ViagioLayout } from '../../viagio/layout/ViagioLayout';
import { CheckboxListWithSubMenu } from '../components/CheckboxListWithSubMenu';


export const RegisterRolPage = () => {
  const { handleSubmit, control } = useForm<RolFormData>({
    defaultValues: {
      nombre: '',
      descripcion: '',
      permisos: [], // Inicializar permisos como un array vacío
    }
  });

  const { field: nombreField } = useController({ name: 'nombre', control });
  const { field: descripcionField } = useController({ name: 'descripcion', control });
  
  const onSubmitForm: SubmitHandler<RolFormData> = (data) => {
    // Lógica para enviar los datos del formulario
    console.log(data);
  };

  return (
    <ViagioLayout>
        <form onSubmit={handleSubmit(onSubmitForm)}>
            <FormControl fullWidth sx={{ pl: 4 }}>
            <TextField
                {...nombreField}
                label="Nombre"
                margin="normal"
                variant="outlined"
                InputLabelProps={{ sx: { color: '#616161' } }}
                InputProps={{ sx: { color: '#616161' } }}
            />
            <TextField
                {...descripcionField}
                label="Descripción"
                margin="normal"
                variant="outlined"
                multiline
                InputLabelProps={{ sx: { color: '#616161' } }}
                InputProps={{ sx: { color: '#616161' } }}
            />
            <FormGroup sx={{ maxHeight: '400px', overflowY: 'auto' }}>
                <CheckboxListWithSubMenu control={control} />
            </FormGroup>
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Registrar Rol
            </Button>
            </FormControl>
        </form>
    </ViagioLayout>
  );
};
