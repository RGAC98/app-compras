import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { CompileMetadataResolver } from '@angular/compiler';

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
  getFacturaDetallePorNroFactura(nroFactura)
  {
    return this.compras.get(this.ruta+"/factura_detalle/nroFactura/"+nroFactura)
  }
  getFacturaDetallePorCodigoProducto(codigoProducto)
  {
    return this.compras.get(this.ruta+"/factura_detalle/producto/"+codigoProducto)
  }
}
