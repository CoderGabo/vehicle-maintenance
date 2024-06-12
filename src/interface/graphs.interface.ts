import { Data } from './plot.interface';

export interface GraphsComponentProps {
    serviceData: Data | null;
    gananciaData: Data | null;
    maintenanceData: Data | null;
    loading: boolean;
}
