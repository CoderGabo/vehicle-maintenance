import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import GroupIcon from '@mui/icons-material/Group';
import BuildIcon from '@mui/icons-material/Build';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import HandymanIcon from '@mui/icons-material/Handyman';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// Definir un tipo para los iconos que es un componente de React.
type MenuItemIcon = React.ReactElement;

export interface MenuItem {
  name: string;
  icon: MenuItemIcon;
  link?: string;
  subMenu?: MenuItem[];
}

export const menuItems: MenuItem[] = [
  {
    name: "Dashboard",
    icon: <DashboardIcon />,
    link: "/dashboard"
  },
  {
    name: "Gestion de Usuarios",
    icon: <GroupIcon />,
    subMenu: [
      {
        name: "Registrar Usuario",
        icon: <PersonAddIcon />,
        link: "/usuarios/registrar"
      },
      {
        name: "Ver Usuarios",
        icon: <VisibilityIcon />,
        link: "/usuarios/ver"
      }
    ]
  },
  {
    name: "Gestión de Roles",
    icon: <SupervisorAccountIcon/>,
    subMenu: [
      {
        name: "Registrar Roles",
        icon: <VerifiedUserIcon />,
        link: "/roles/registrar"
      },
      {
        name: "Ver Roles",
        icon: <VisibilityIcon/>,
        link: "/roles/ver"
      },
    ]
  },
  {
    name: "Gestion de Vehículos",
    icon: <DirectionsCarIcon />,
    subMenu: [
      {
        name: "Registrar Vehículo",
        icon: <AddCircleOutlineIcon />,
        link: "/vehiculos/registrar"
      },
      {
        name: "Ver Vehículos",
        icon: <VisibilityIcon />,
        link: "/vehiculos/ver"
      }
    ]
  },
  {
    name: "Gestión de Mantenimientos",
    icon: <MiscellaneousServicesIcon />,
    subMenu: [
      {
        name: "Ver Citas de Mantenimiento",
        icon: <CalendarTodayIcon />,
        link: "/mantenimientos/citas"
      },
      {
        name: "Ver Mantenimientos",
        icon: <VisibilityIcon />,
        link: "/mantenimientos/ver"
      }
    ]
  },
  {
    name: "Gestion de Servicios",
    icon: <BuildIcon />,
    subMenu:[
      {
        name: "Registrar Servicios",
        icon: <HandymanIcon/>,
        link: "/servicios/registrar"
      },
      {
        name: "Ver Servicios",
        icon: <VisibilityIcon/>,
        link: "/servicios/ver"
      },
    ]
  },
];