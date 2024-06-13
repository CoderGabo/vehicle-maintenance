import { Detail } from "./detail.interface";
import { VehicleFormData } from "./vehicleFormData";

export interface Maintenance {
  id: string;
  date: string;
  status: string;
  details: Detail[];
  vehicle: VehicleFormData;
}
