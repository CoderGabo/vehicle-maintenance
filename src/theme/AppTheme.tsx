import { ThemeProvider, createTheme } from '@mui/material/styles';
import {CssBaseline } from '@mui/material';

import { AppThemeProps } from './AppTheme.interface';

const vehicleMaintenanceTheme  = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#7852A7',  // Púrpura suave para reflejar profesionalismo y confianza
            light: '#AF89D6', // Un tono más claro para resaltar
            dark: '#52316B'   // Un tono más oscuro para contrastes
        },
        secondary: {
            main: '#FFB74D',  // Naranja suave para añadir un toque de vitalidad y energía
            light: '#FFD180',
            dark: '#C88719'
        },
        error: {
            main: '#D32F2F',  // Rojo para indicar alertas o errores
        },
        warning: {
            main: '#FFA000',  // Amarillo para advertencias o llamadas de atención
        },
        info: {
            main: '#64B5F6',  // Azul claro para información o mensajes
        },
        success: {
            main: '#4CAF50',  // Verde para indicar éxito o acciones positivas
        },
        background: {
            default: '#F5F5F5',  // Fondo ligeramente grisáceo para una apariencia más suave
            paper: '#5A6270',    // Cambiado a un tono más oscuro para los papeles
        },
        text: {
            primary: '#FFFFFF',  // Texto principal en blanco para un buen contraste
            secondary: '#FFFFFFF',  // Texto secundario en un gris más oscuro para menos prominencia
            disabled: '#9E9E9E',  // Texto desactivado en un tono aún más oscuro de gris
        },
        divider: '#BDBDBD'  // Color del separador en un gris más claro
    },
});

export const  AppTheme = ({children}: AppThemeProps) => {
  return (
    <ThemeProvider theme={vehicleMaintenanceTheme }>
      <CssBaseline />
        {children}
    </ThemeProvider>
  );
}
