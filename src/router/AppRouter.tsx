import { Route, Routes } from "react-router-dom";
import { ViagioPage } from "../viagio/pages/ViagioPage";
import { DashboardPage } from "../admin/pages/DashboardPage";
import { RegisterUserPage } from "../admin/pages/RegiserUserPage";
import { SeeUsersPage } from "../admin/pages/SeeUsersPage";
import { RegisterVehiclePage } from "../admin/pages/RegisterVehiclePage";
import { SeeVehiclesPage } from "../admin/pages/seeVehiclePage";

import { RegisterServicePage } from "../common/RegisterSevicePage";
import { SeeServicePage } from "../common/SeeServicePage";
import { RegisterAppointmentPage } from "../common/RegisterAppointmentPage";
import { SeeMaintenancePage } from "../employee/SeeMaintenancePage";
import { SetDetailMaintenancePage } from "../employee/SetDetailMaintenancePage";
import { RegisterRolPage } from "../admin/pages/RegisterRolPage";
import { SeeRolPage } from "../admin/pages/SeeRolPage";
import { SeeDetailMaintenance } from "../customer/SeeDetailMaintenance";
import { LoginPage } from "../admin/pages/LoginPage";

export const AppRouter = () => {
  return (
    <Routes>
        <Route path="/" element={ <ViagioPage /> }/>

        <Route path="/login" element={ <LoginPage /> }/>

        <Route path="/dashboard" element={ <DashboardPage /> }/>

        <Route path="/usuarios/registrar" element={ <RegisterUserPage /> }/>
        <Route path="/usuarios/ver" element={ <SeeUsersPage /> }/>

        <Route path="/roles/registrar" element={ <RegisterRolPage /> }/>
        <Route path="/roles/ver" element={ <SeeRolPage /> }/>

        <Route path="/vehiculos/registrar" element={ <RegisterVehiclePage /> }/>
        <Route path="/vehiculos/ver" element={ <SeeVehiclesPage /> }/>

        <Route path="/servicios/registrar" element={ <RegisterServicePage /> }/>
        <Route path="/servicios/ver" element={ <SeeServicePage /> }/>

        <Route path="/mantenimientos/citas" element={ <RegisterAppointmentPage /> }/>

        <Route path="/mantenimientos/ver" element={ <SeeMaintenancePage /> }/>
        <Route path="/mantenimiento/detalle/:idMantenimiento" element={ <SetDetailMaintenancePage /> }/>

        <Route path="/mantenimiento/detalle/cliente/:idMantenimiento" element={ <SeeDetailMaintenance /> }/>
    </Routes>
  )
}
