import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CabeceraClienteComponent } from "./factura_cabecera/cabecera-cliente/cabecera-cliente.component";
import {ReportesComponent} from './factura_detalle/reportes/reportes.component'

const routes: Routes = [
  {path: 'cabeceras', component: CabeceraClienteComponent},
  {path: 'reportes', component: ReportesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
