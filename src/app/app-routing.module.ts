import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CabeceraClienteComponent } from "./factura_cabecera/cabecera-cliente/cabecera-cliente.component";
import {ReportesComponent} from './factura_detalle/reportes/reportes.component'
import {LandingComponent} from '../app/landing/landing.component'

const routes: Routes = [
  {path: 'cabeceras', component: CabeceraClienteComponent},
  {path: 'reportes', component: ReportesComponent},
  {path: '', component: LandingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
