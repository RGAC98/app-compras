import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class ApiInventarioService 
{
  ruta = 'https://pruebaherokuappdiaz.herokuapp.com'

  constructor(private inventario: HttpClient) 
  {}

  getObtenerInventario()
  {
    return this.inventario.get(this.ruta+'/listar/producto')
  }

  getObtenerProducto(codigo)
  {
    return this.inventario.get(this.ruta+`/api/compras/p/${codigo}`)
  }
}
