import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CabeceraClienteComponent } from "./factura_cabecera/cabecera-cliente/cabecera-cliente.component";
import {ReportesComponent} from './factura_detalle/reportes/reportes.component'
import {DetalleComponent} from './factura_producto/detalle/detalle.component'
import {LandingComponent} from '../app/landing/landing.component'
import { ProveedoresComponent } from './proveedor/components/proveedores/proveedores.component'

const routes: Routes = [
  {path: 'cabeceras', component: CabeceraClienteComponent},
  {path: 'reportes', component: ReportesComponent},
  {path: 'detalle/:fcab_id', component: DetalleComponent},
  {path: '', component: LandingComponent},
  {path: 'proveedor', component: ProveedoresComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
