import React, { useState } from 'react';
import { BaseFiltersModalProps } from '../../interface/baseFilters.interface';
import { Box, Button, Checkbox, FormControl, IconButton, InputLabel, ListItemText, MenuItem, Modal, OutlinedInput, Select, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: '10px 10px 16px rgba(0, 0, 0, 0.16)',
    p: 4,
};

const months = [
    { name: 'Enero', value: 1 },
    { name: 'Febrero', value: 2 },
    { name: 'Marzo', value: 3 },
    { name: 'Abril', value: 4 },
    { name: 'Mayo', value: 5 },
    { name: 'Junio', value: 6 },
    { name: 'Julio', value: 7 },
    { name: 'Agosto', value: 8 },
    { name: 'Septiembre', value: 9 },
    { name: 'Octubre', value: 10 },
    { name: 'Noviembre', value: 11 },
    { name: 'Diciembre', value: 12 },
];

export const BaseFiltersModal: React.FC<BaseFiltersModalProps> = ({ isOpen, onRequestClose, onApplyFilters, children, allowedYears, resetFilters, onRemoveFilters }) => {
    const [selectedYear, setSelectedYear] = useState<number | ''>('');
    const [selectedMonths, setSelectedMonths] = useState<number[]>([]);

    const handleApplyFilters = () => {
        const filters = {
            year: selectedYear === '' ? null : selectedYear,
            months: selectedMonths
        };
        onApplyFilters(filters);
        onRequestClose();
    };

    const handleMonthChange = (event: any) => {
        const value = event.target.value;
        setSelectedMonths(typeof value === 'string' ? value.split(',') : value);
    };

    // Función para restablecer los filtros
    const resetAllFilters = () => {
        setSelectedYear('');
        setSelectedMonths([]);
        resetFilters();
        handleApplyFilters(); 
        onRemoveFilters();
    };

    return (
        <Modal
            open={isOpen}
            onClose={onRequestClose}
            aria-labelledby="modal-filters-title"
            aria-describedby="modal-filters-description"
        >
            <Box sx={style}>
                <IconButton
                    aria-label="close"
                    onClick={onRequestClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Typography id="modal-filters-title" variant="h6" component="h2">
                    Agregar Filtros
                </Typography>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="year-select-label">Año</InputLabel>
                    <Select
                        labelId="year-select-label"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value as number)}
                        input={<OutlinedInput label="Año" />}
                    >
                        {allowedYears.map((year) => (
                            <MenuItem key={year} value={year}>
                                {year}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="month-select-label">Meses</InputLabel>
                    <Select
                        labelId="month-select-label"
                        multiple
                        value={selectedMonths}
                        onChange={handleMonthChange}
                        input={<OutlinedInput label="Meses" />}
                        renderValue={(selected) => selected.map(value => months.find(month => month.value === value)?.name).join(', ')}
                    >
                        {months.map((month) => (
                            <MenuItem key={month.value} value={month.value}>
                                <Checkbox checked={selectedMonths.indexOf(month.value) > -1} />
                                <ListItemText primary={month.name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {children}  {/* Renderizar campos adicionales aquí */}
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="contained" color="primary" onClick={handleApplyFilters} style={{ marginRight: 10 }}>
                        Aplicar Filtros
                    </Button>
                    <Button variant="contained" color="secondary" onClick={resetAllFilters} style={{ marginRight: 10 }}>
                        Borrar Filtros
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};
