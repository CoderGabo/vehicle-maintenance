import { useEffect, useState } from 'react';
import { Button, Container, Grid } from '@mui/material';

import {instanceBussiness} from "../../utils/axiosConfig";

import { ViagioLayout } from "../../viagio/layout/ViagioLayout";
import { GraphsComponent } from '../components/graphsComponent';

import { ServiceFiltersModal } from '../components/ServiceFiltersModal';
import { GananciaFiltersModal } from '../components/GananciaFiltersModal';
import {MaintenanceFiltersModal} from '../components/MaintenanceFiltersModal';
import { Data } from "../../interface/plot.interface";
export const DashboardPage = () => {

    const [serviceData, setServiceData] = useState<Data | null>(null);
    const [gananciaData, setGananciaData] = useState<Data | null>(null);
    const [maintenanceData, setMaintenanceData] = useState<Data | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const [serviceModalOpen, setServiceModalOpen] = useState(false);
    const [gananciaModalOpen, setGananciaModalOpen] = useState(false);
    const [maintenanceModalOpen, setMaintenanceModalOpen] = useState(false);

    const fetchData = async (dataType: string = '', filters: any = {}) => {
        try {
            if (dataType === '' || dataType === 'servicios-adicionales') {
                const response = await instanceBussiness.get<{ figura: Data }>('kpi/servicios-adicionales/', { params: filters });
                setServiceData(response.data.figura);
            }
            if (dataType === '' || dataType === 'ganancias-totales') {
                const gananciaResponse = await instanceBussiness.get<{ figura: Data }>('kpi/ganancias-totales/', { params: filters });
                setGananciaData(gananciaResponse.data.figura);
            }
            if (dataType === '' || dataType === 'vehiculos-mantenimiento') {
                const maintenanceReponse = await instanceBussiness.get<{ figura: Data }>('kpi/vehiculos-mantenimiento/', { params: filters });
                setMaintenanceData(maintenanceReponse.data.figura);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener los datos del gráfico:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleResetGraphs = () => {
        fetchData();
    };

    return (

        <ViagioLayout>
            <Container>
                <Grid container spacing={2} justifyContent="center" alignItems="center" marginTop={1}>
                    <Grid item>
                        <Button variant="outlined" onClick={() => setServiceModalOpen(true)}>Agregar Filtros Servicios</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" onClick={() => setGananciaModalOpen(true)}>Agregar Filtros Ganancias</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" onClick={() => setMaintenanceModalOpen(true)}>Agregar Filtros Mantenimiento</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" color="secondary" onClick={handleResetGraphs}>Resetear Gráficos</Button>
                    </Grid>
                </Grid>
                <GraphsComponent 
                    serviceData={serviceData} 
                    gananciaData={gananciaData} 
                    maintenanceData={maintenanceData} 
                    loading={loading} 
                />
                <ServiceFiltersModal
                    isOpen={serviceModalOpen}
                    onRequestClose={() => setServiceModalOpen(false)}
                    onApplyFilters={(filters) => fetchData('servicios-adicionales',filters)}
                    onRemoveFilters={() => fetchData('servicios-adicionales')}
                />
                <GananciaFiltersModal
                    isOpen={gananciaModalOpen}
                    onRequestClose={() => setGananciaModalOpen(false)}
                    onApplyFilters={(filters) => fetchData('ganancias-totales',filters)}
                    onRemoveFilters={() => fetchData('ganancias-totales')}
                />
                <MaintenanceFiltersModal
                    isOpen={maintenanceModalOpen}
                    onRequestClose={() => setMaintenanceModalOpen(false)}
                    onApplyFilters={(filters) => fetchData('vehiculos-mantenimiento',filters)}
                    onRemoveFilters={() => fetchData('vehiculos-mantenimiento')}
                />
            </Container>
        </ViagioLayout>
    )
}
