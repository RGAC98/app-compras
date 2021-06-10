import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService 
{

  constructor(private http: HttpClient) 
  {}

  postCrearProveedor(prv_dni, prv_nombre, prv_ciudad, prv_tipo, prv_direccion, prv_telefono, prv_email, prv_estado)
  {
    return this.http.post('https://utn-compras-api.herokuapp.com/proveedor', {prv_dni, prv_nombre, prv_ciudad, prv_tipo, prv_direccion, prv_telefono, prv_email, prv_estado});
  }

  getProveedores()
  {
    return this.http.get('https://utn-compras-api.herokuapp.com/proveedor')
  }
}
