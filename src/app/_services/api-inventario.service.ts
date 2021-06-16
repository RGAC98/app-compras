import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiInventarioService 
{
  ruta = 'https://pruebaherokuappdiaz.herokuapp.com'

  constructor(private inventario: HttpClient) 
  {}

  getObtenerInventario(): Observable<any>
  {
    return this.inventario.get<any>(this.ruta+'/api/compras')
  }

  getObtenerProducto(codigo): Observable<any>
  {
    return this.inventario.get<any>(this.ruta+`/api/compras/p/${codigo}`)
  }

  putActualizarInventario(codigo, cantidad): Observable<any>
  {
    return this.inventario.put<any>(this.ruta+`/api/compras/c`,{codigo, cantidad})
  }
}