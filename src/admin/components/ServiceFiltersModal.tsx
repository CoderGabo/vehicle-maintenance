import React, { useEffect, useState } from 'react';
import { BaseFiltersModal } from './BaseFiltersModal';
import axios from "../../utils/axiosConfig";

import { ServiceFiltersModalProps } from '../../interface/serviceFilters.interface';
import { Checkbox, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';

export const ServiceFiltersModal: React.FC<ServiceFiltersModalProps> = ({ isOpen, onRequestClose, onApplyFilters, onRemoveFilters }) => {
    
    const [years, setYears] = useState<number[]>([]);
    const [services, setServices] = useState<string[]>([]);
    const [selectedServices, setSelectedServices] = useState<string[]>([]); 

    const fetchData = async () => {
        try {
            const yearResponse = await axios.get<{maintenance_years: number[]}>('get-year-maintenance/');
            setYears(yearResponse.data.maintenance_years)

            const serviceResponse = await axios.get<{service_names: string[]}>('get-service-names/');
            setServices(serviceResponse.data.service_names)
        } catch (error) {
            console.error('Error al obtener los datos de los años:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleApplyFilters = (filters: any) => {
        // Agregar marcas de vehículos seleccionadas a los filtros
        filters.services = selectedServices;
        onApplyFilters(filters);
    };

    const resetFilters = () => {
        // Limpiar los estados de los filtros específicos de este componente
        setSelectedServices([]);
        onRemoveFilters();
    };


    return (
        <BaseFiltersModal isOpen={isOpen} onRequestClose={onRequestClose} onApplyFilters={handleApplyFilters} allowedYears={years} resetFilters={resetFilters} onRemoveFilters={onRemoveFilters}>
            {/* Campos específicos para el gráfico de servicios adicionales */}
            <FormControl fullWidth margin="normal">
                <InputLabel id="service-type-select-label">Tipo de Servicio</InputLabel>
                <Select
                    labelId="service-type-select-label"
                    multiple
                    value={selectedServices} // Establecer el valor del Select al estado de las marcas seleccionadas
                    onChange={(event) => setSelectedServices(event.target.value as string[])} // Actualizar el estado de las marcas seleccionadas
                    input={<OutlinedInput label="Marca de vehiculo" />}
                    renderValue={(selected) => selected.map(value => services.find(service => service === value)).join(', ')}
                >
                    {/* Agregar las opciones específicas aquí */}
                    {services.map((service, index) => (
                        <MenuItem key={index} value={service}>
                            <Checkbox checked={selectedServices.includes(service)} /> 
                            {service}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </BaseFiltersModal>
    );
};
