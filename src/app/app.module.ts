import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Aqui (shared/material/material.module) importar todos los modulos de material que se requiera, aunque ya estan todos casi.
import { MaterialModule } from './shared/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { CabeceraClienteComponent } from './factura_cabecera/cabecera-cliente/cabecera-cliente.component';
import { ReportesComponent } from './factura_detalle/reportes/reportes.component';
import { DetalleComponent } from './factura_producto/detalle/detalle.component';
import { InventarioComponent } from './factura_producto/inventario/inventario.component';
import { ProductoComponent } from './factura_producto/producto/producto.component';
import { LandingComponent } from './landing/landing.component';
import { ProveedoresComponent } from './proveedor/components/proveedores/proveedores.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditProveedorComponent } from './proveedor/components/edit-proveedor/edit-proveedor.component';
import { ReporteSaldosComponent } from './proveedor/components/reporte-saldos/reporte-saldos.component';


@NgModule({
  declarations: [
    AppComponent,
    CabeceraClienteComponent,
    ReportesComponent,
    DetalleComponent,
    InventarioComponent,
    ProductoComponent,
    LandingComponent,
    ProveedoresComponent,
    EditProveedorComponent,
    ReporteSaldosComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
