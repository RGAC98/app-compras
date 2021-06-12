import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class ApiComprasService 
{
  ruta = 'https://utn-compras-api.herokuapp.com'

  constructor(private compras: HttpClient) 
  {}

  getFacturaDetallePorProveedorDNI(dni)
  {
    return this.compras.get(this.ruta+"/factura_detalle/proveedor/"+dni)
  }

  //Servicios de factura_cabecera

  getFacturaCabeceraByID(fcab_id)
  {
    return this.compras.get(this.ruta+`/cabeceras/${fcab_id}`)
  }
}
