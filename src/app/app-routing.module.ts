import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ProveedoresComponent} from '../app/proveedor/proveedores/proveedores.component'
import { CabeceraClienteComponent } from "./factura_cabecera/cabecera-cliente/cabecera-cliente.component";

const routes: Routes = [
  {path: 'cabeceras', component: CabeceraClienteComponent},
  {path: 'proveedores', component: ProveedoresComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
