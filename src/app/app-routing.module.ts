import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CabeceraClienteComponent } from "./factura_cabecera/cabecera-cliente/cabecera-cliente.component";
import { ProveedoresComponent } from './proveedor/components/proveedores/proveedores.component'

const routes: Routes = [
  {path: 'cabeceras', component: CabeceraClienteComponent},
  {path: 'proveedor', component: ProveedoresComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
