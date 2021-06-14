import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  constructor(private http: HttpClient) { }

  public getProveedores() {
    const url = `https://utn-compras-api.herokuapp.com/proveedor`;
    return this.http.get(url);
  }

  public getProveedorById(id) {
    const url = `https://utn-compras-api.herokuapp.com/proveedor/`+id;
    return this.http.get(url);
  }

  public deleteProveedor(id) {
    const url = `https://utn-compras-api.herokuapp.com/proveedor/`+id;
    return this.http.delete(url);
  }

  public postProveedor(body) {
    const url = `https://utn-compras-api.herokuapp.com/proveedor`;
    return this.http.post(url,body);
  }

  public putProveedor(body) {
    const url = `https://utn-compras-api.herokuapp.com/proveedor`;
    return this.http.get(url,body);
  }
}
