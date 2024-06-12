import React, { useEffect, useState } from 'react';

import axios from "../../utils/axiosConfig";

import { BaseFiltersModal } from './BaseFiltersModal';
import { GananciaFiltersModalProps } from '../../interface/gananciaFilters.interface';

export const GananciaFiltersModal: React.FC<GananciaFiltersModalProps> = ({ isOpen, onRequestClose, onApplyFilters, onRemoveFilters}) => {
    const [years, setYears] = useState<number[]>([]);

    const fetchYears = async () => {
        try {
            const response = await axios.get<{maintenance_years: number[]}>('get-year-maintenance/');
            setYears(response.data.maintenance_years)
        } catch (error) {
            console.error('Error al obtener los datos de los años:', error);
        }
    };


    useEffect(() => {
        fetchYears();
    }, []);

    const resetFilters = () => {
        // Limpiar los estados de los filtros específicos de este componente
        onRemoveFilters();
    };


    return (
        <BaseFiltersModal isOpen={isOpen} onRequestClose={onRequestClose} onApplyFilters={onApplyFilters} allowedYears={years} resetFilters={resetFilters} onRemoveFilters={onRemoveFilters}>
            {null}
        </BaseFiltersModal>
    );
};
