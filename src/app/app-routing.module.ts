import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CabeceraClienteComponent } from "./factura_cabecera/cabecera-cliente/cabecera-cliente.component";
import {ReportesComponent} from './factura_detalle/reportes/reportes.component'
import {DetalleComponent} from './factura_producto/detalle/detalle.component'

const routes: Routes = [
  {path: 'cabeceras', component: CabeceraClienteComponent},
  {path: 'reportes', component: ReportesComponent},
  {path: 'detalle/:fcab_id', component: DetalleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
