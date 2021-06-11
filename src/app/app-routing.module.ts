import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CabeceraClienteComponent } from "./factura_cabecera/cabecera-cliente/cabecera-cliente.component";

const routes: Routes = [
  {path: 'cabeceras', component: CabeceraClienteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
