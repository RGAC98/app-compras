import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiComprasService 
{
  ruta = 'https://utn-compras-api.herokuapp.com'

  constructor(private compras: HttpClient) 
  {}

  //Servicios de factura_detalle
  getFacturaDetallePorProveedorDNI(dni): Observable<any>
  {
    return this.compras.get<any>(this.ruta+"/factura_detalle/proveedor/"+dni)
  }

  getFacturaDetallePorNroFactura(nroFactura): Observable<any>
  {
    return this.compras.get<any>(this.ruta+"/factura_detalle/nroFactura/"+nroFactura)
  }
  
  getFacturaDetallePorCodigoProducto(codigoProducto): Observable<any>
  {
    return this.compras.get<any>(this.ruta+"/factura_detalle/producto/"+codigoProducto)
  }

  //Servicios de factura_cabecera
  getFacturaCabeceraByID(fcab_id): Observable<any>
  {
    return this.compras.get<any>(this.ruta+`/cabeceras/${fcab_id}`)
  }

  //Servicios de factura_producto
  getProductosDeUnaCabecera(fcab_id): Observable<any>
  {
    return this.compras.get<any>(this.ruta+`/factura_producto/${fcab_id}`)
  }

  postCrearFacturaDetalle(fdet_fcab_id): Observable<any> {
    return this.compras.post<any>(this.ruta+`/factura_detalle`, {fdet_fcab_id})
  }

  deleteEliminarProducto(id_cabecera, id_detalle, producto): Observable<any>
  {
    return this.compras.delete<any>(this.ruta+`/factura_producto/${id_cabecera}/${id_detalle}/${producto}`)
  }

  putActualizarProducto(id_cabecera, id_detalle, producto, cantidad): Observable<any>
  {
    return this.compras.put<any>(this.ruta+`/factura_producto`, {id_cabecera, id_detalle, producto, cantidad})
  }

  postIngresarProducto(fpro_fcab_id, fpro_fdet_id, fpro_cantidad, fpro_producto, fpro_pvp, fpro_iva): Observable<any>
  {
    return this.compras.post<any>(this.ruta+`/factura_producto`, {fpro_fcab_id, fpro_fdet_id, fpro_cantidad, fpro_producto, fpro_pvp, fpro_iva})
  }
}
