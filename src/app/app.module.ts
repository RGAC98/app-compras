import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Aqui (shared/material/material.module) importar todos los modulos de material que se requiera, aunque ya estan todos casi.
import { MaterialModule } from './shared/material/material.module';

import { HttpClientModule } from '@angular/common/http';

import { CabeceraClienteComponent } from './factura_cabecera/cabecera-cliente/cabecera-cliente.component';

@NgModule({
  declarations: [
    AppComponent,
    CabeceraClienteComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
