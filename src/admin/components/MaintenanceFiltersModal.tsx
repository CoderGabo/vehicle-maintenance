import React, { useEffect, useState } from 'react';
import { Checkbox, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';

import axios from "../../utils/axiosConfig";

import { BaseFiltersModal } from './BaseFiltersModal';
import { MaintenanceFiltersModalProps } from '../../interface/maintenanceFilters.interface';

export const MaintenanceFiltersModal: React.FC<MaintenanceFiltersModalProps> = ({ isOpen, onRequestClose, onApplyFilters, onRemoveFilters}) => {

    const [years, setYears] = useState<number[]>([]);
    const [brands, setBrands] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]); 

    const fetchData = async () => {
        try {
            const yearResponse = await axios.get<{maintenance_years: number[]}>('get-year-maintenance/');
            setYears(yearResponse.data.maintenance_years)

            const brandResponse = await axios.get<{vehicle_brands: string[]}>('get-brand-vehicles/');
            setBrands(brandResponse.data.vehicle_brands)
        } catch (error) {
            console.error('Error al obtener los datos de los años:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleApplyFilters = (filters: any) => {
        // Agregar marcas de vehículos seleccionadas a los filtros
        filters.brands = selectedBrands;
        onApplyFilters(filters);
    };

    const resetFilters = () => {
        // Limpiar los estados de los filtros específicos de este componente
        setSelectedBrands([]);
        onRemoveFilters();
    };

    return (
        <BaseFiltersModal isOpen={isOpen} onRequestClose={onRequestClose} onApplyFilters={handleApplyFilters} allowedYears={years} resetFilters={resetFilters} onRemoveFilters={onRemoveFilters}>
            {/* Campos específicos para el gráfico de mantenimiento */}
            <FormControl fullWidth margin="normal">
                <InputLabel id="maintenance-type-select-label">Marca de Vehiculo</InputLabel>
                <Select
                    labelId="maintenance-type-select-label"
                    multiple
                    value={selectedBrands} // Establecer el valor del Select al estado de las marcas seleccionadas
                    onChange={(event) => setSelectedBrands(event.target.value as string[])} // Actualizar el estado de las marcas seleccionadas
                    input={<OutlinedInput label="Marca de vehiculo" />}
                    renderValue={(selected) => selected.map(value => brands.find(brand => brand === value)).join(', ')}
                >
                    {/* Cambiar la lista de marcas a checkboxes */}
                    {brands.map((brand, index) => (
                        <MenuItem key={index} value={brand}>
                            <Checkbox checked={selectedBrands.includes(brand)} /> 
                            {brand}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </BaseFiltersModal>
    );
};
