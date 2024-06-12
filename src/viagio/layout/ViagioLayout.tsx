
import { ReactNode, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, CssBaseline, Drawer, List, ListItemIcon, ListItemText, useMediaQuery, useTheme, IconButton, ListItemButton, Typography, Collapse } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import {menuItems, MenuItem} from "../components/layout/menuItem";
import { ExpandLess, ExpandMore } from "@mui/icons-material";


interface ViagioLayoutProps {
    children: ReactNode;
}

const drawerWidth = 240;

const user = {
    nombre: "Gabriel",
    rol: "admin",
    permisos: ["Gestion de Usuarios", "Ver Usuarios"] // Ejemplo de permisos
};

export const ViagioLayout = ({children}: ViagioLayoutProps) => {
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

    const renderMenuItems = (items: MenuItem[], parentOpen: boolean) => {
        return items.map((item, index) => {
            // if (!user.permisos.includes(item.name)) {
            //     return null; // No renderizar el elemento si el usuario no tiene permisos
            // }
            
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
            <Box sx={{ height: toolBarHeight, display: 'flex'}}> {/* Simulando un Toolbar */}
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
