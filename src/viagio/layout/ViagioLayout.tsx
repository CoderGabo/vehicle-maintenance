
import { ReactNode, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, CssBaseline, Drawer, List, ListItemIcon, ListItemText, useMediaQuery, useTheme, IconButton, ListItemButton, Typography, Collapse } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ExitToApp } from '@mui/icons-material';

import {menuItems, MenuItem} from "../components/layout/menuItem";
import { ExpandLess, ExpandMore } from "@mui/icons-material";


interface ViagioLayoutProps {
    children: ReactNode;
}

interface User {
    userId: string;
    username: string;
    token: string;
    role: string;
  }

const drawerWidth = 240;

export const ViagioLayout = ({children}: ViagioLayoutProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const theme = useTheme();
    const isLarge = useMediaQuery(theme.breakpoints.up('lg'));
    const [mobileOpen, setMobileOpen] = useState(false);

    const toolBarHeight = isLarge ? 20 : 40;

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const [openSubMenus, setOpenSubMenus] = useState<boolean[]>(Array(menuItems.length).fill(false));

    const handleSubMenuClick = (index: number) => {
        const newOpenSubMenus = [...openSubMenus];
        newOpenSubMenus[index] = !newOpenSubMenus[index];
        setOpenSubMenus(newOpenSubMenus);
    };

    // Estado para almacenar los permisos del usuario
    const [permissions, setPermissions] = useState<string[]>([]);

    useEffect(() => {
        // Simulación de obtención de datos de localStorage
        const userData: User = JSON.parse(localStorage.getItem("user")|| "{}");

        // Definición de permisos basados en el rol del usuario
        const userPermissions = getPermissions(userData.role);
        setPermissions(userPermissions);
    }, []);

    const getPermissions = (role: string): string[] => {
        switch (role) {
          case "customer":
            return [
                "Gestion de Vehículos",
                "Ver Vehículos",
                "Gestión de Mantenimientos",
                "Ver Citas de Mantenimiento",
            ];
          case "employee":
            return [
                "Gestión de Mantenimientos",
                "Ver Citas de Mantenimiento",
                "Ver Mantenimientos",
                "Gestion de Servicios",
                "Registrar Servicios",
                "Ver Servicios"
            ];
          case "admin":
            return [
                "Dashboard",
                "Gestion de Usuarios",
                "Registrar Usuario",
                "Ver Usuarios",
                "Gestión de Roles",
                "Registrar Roles",
                "Ver Roles",
                "Gestion de Vehículos",
                "Registrar Vehículo",
                "Ver Vehículos",
                "Gestión de Mantenimientos",
                "Ver Citas de Mantenimiento",
                "Ver Mantenimientos",
                "Gestion de Servicios",
                "Registrar Servicios",
                "Ver Servicios"
            ];
          default:
            return [];
        }
      };

    const handleLogout = () => {
        // Limpiar datos de usuario del localStorage
        localStorage.removeItem("user");
        // Redirigir a la página de inicio de sesión (o a cualquier otra página deseada)
        navigate('/login');
    };

    const renderMenuItems = (items: MenuItem[], parentOpen: boolean) => {
        return items.map((item, index) => {
            if (!permissions.includes(item.name)) {
                return null; // No renderizar el elemento si el usuario no tiene permisos
            }
            
            const isOpen = openSubMenus[index];
            const hasSubMenu = item.subMenu && item.subMenu.length > 0;

            const isActive = location.pathname === item.link;
            return (
                <div key={index}>
                    <ListItemButton
                        sx={{
                            backgroundColor: isActive ? theme.palette.action.active : "transparent", 
                            '&:hover': {
                                backgroundColor: theme.palette.background.default,
                                color: 'black',
                                '& .MuiListItemIcon-root': {
                                    color: 'black',
                                },
                            },
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (hasSubMenu) {
                                handleSubMenuClick(index);
                            }
                        }}
                        {...(item.link && { href: item.link })} 
                    >
                        <ListItemIcon 
                            sx={{ 
                                color: 'white',
                            }} 
                        >
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.name} />
                        {hasSubMenu && (isOpen ? <ExpandLess /> : <ExpandMore />)}
                    </ListItemButton>
                    {hasSubMenu && item.subMenu && ( // Verificar si item.subMenu existe
                        <Collapse
                            in={isOpen}
                            timeout="auto"
                            unmountOnExit
                            sx={{
                                boxShadow: isOpen && parentOpen ? "0px 4px 10px rgba(0, 0, 0, 0.2)" : "none",
                            }}
                        >
                            <List
                                disablePadding
                                sx={{
                                    backgroundColor: theme.palette.background.paper,
                                }}
                            >
                                {renderMenuItems(item.subMenu, isOpen)}
                            </List>
                        </Collapse>
                    )}
                </div>
            );
        });
    };

    const drawer = (
        <Box onClick={handleDrawerToggle}>
            <Box sx={{ height: toolBarHeight, display: 'flex' }}> {/* Simulando un Toolbar */}
                <IconButton
                    aria-label="cerrar sesión"
                    onClick={handleLogout}
                    sx={{
                        position: 'absolute',
                        left: theme.spacing(25),
                        color: 'orange',
                    }}
                >
                    <ExitToApp />
                </IconButton>
            </Box>
            <Typography variant="h6" sx={{ paddingLeft: 1 }}>
                Menú de Navegación
            </Typography>
            <List>
                {renderMenuItems(menuItems || [], false)}
            </List>
        </Box>
    );

    return (
        <>
            <CssBaseline />
            <Box sx={{ display: 'flex' }}>
                <IconButton
                    aria-label="open drawer"
                    edge="end"
                    onClick={handleDrawerToggle}
                    sx={{ 
                        display: {  
                            xs: 'block', 
                            lg: 'none' 
                        }, 
                        position: 'fixed', zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    color={mobileOpen ? 'inherit' : 'primary'} 
                >
                    <MenuIcon />
                </IconButton>
                <Drawer
                    variant={isLarge  ? 'permanent' : 'temporary'}
                    open={isLarge || mobileOpen}
                    onClose={handleDrawerToggle}
                    sx={{
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth
                        },
                        display: { lg:'none' }
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {drawer}
                </Drawer>
                {isLarge && (
                    <Drawer
                        variant="permanent"
                        sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                        }}
                    >
                        {drawer}
                    </Drawer>
                )}
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3 }}
                >
                {/* <Toolbar /> */}
                    {children}
                </Box>
            </Box>
        </>
    )
}
