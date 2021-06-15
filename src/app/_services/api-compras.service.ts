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

  //Servicios de factura_detalle
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

  //Servicios de factura_cabecera
  getFacturaCabeceraByID(fcab_id)
  {
    return this.compras.get(this.ruta+`/cabeceras/${fcab_id}`)
  }

  //Servicios de factura_producto
  getProductosDeUnaCabecera(fcab_id)
  {
    return this.compras.get(this.ruta+`/factura_producto/${fcab_id}`)
  }
}
