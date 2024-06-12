import React from 'react';
import { Box, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { MenuItem, menuItems } from '../../viagio/components/layout/menuItem'; // Suponiendo que este es tu archivo menuItems
import { useController, Control } from 'react-hook-form';
import { RolFormData } from '../../interface/rolFormData';

interface Props {
  control: Control<RolFormData>; // Asumiendo que RolFormData es el tipo de tus datos de formulario
}

export const CheckboxListWithSubMenu: React.FC<Props> = ({ control }) => {
  const { field: permisosField } = useController({ name: 'permisos', control });

  const handleCheckboxChange = (permiso: string) => {
    const currentPermisos = permisosField.value || [];
    const newPermisos = currentPermisos.includes(permiso)
      ? currentPermisos.filter((p) => p !== permiso)
      : [...currentPermisos, permiso];

    permisosField.onChange(newPermisos);
  };

  const renderCheckbox = (menuItem: MenuItem, isSubMenu?: boolean): React.ReactElement => {
    const marginLeft = isSubMenu ? 2 : 0;

    return (
      <FormControlLabel
        key={menuItem.name}
        control={
          <Checkbox
            checked={(permisosField.value || []).includes(menuItem.name)}
            onChange={() => handleCheckboxChange(menuItem.name)}
          />
        }
        label={menuItem.name}
        sx={{ color: '#616161', marginLeft }}
      />
    );
  };

  const renderSubMenuCheckboxes = (subMenu: MenuItem[] | undefined): React.ReactElement | null => {
    if (!subMenu) return null;

    return (
      <Box maxHeight="100px" overflow="auto">
        {subMenu.map((subMenuItem) => (
          <div key={subMenuItem.name} style={{ marginLeft: '2rem' }}>
            {renderCheckbox(subMenuItem, true)}
          </div>
        ))}
      </Box>
    );
  };

  return (
    <FormGroup>
      {menuItems.map((menuItem) => (
        <div key={menuItem.name}>
          {renderCheckbox(menuItem)}
          {renderSubMenuCheckboxes(menuItem.subMenu)}
        </div>
      ))}
    </FormGroup>
  );
};