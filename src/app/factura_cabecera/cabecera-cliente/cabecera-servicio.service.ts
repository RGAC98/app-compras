import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CabeceraServicioService {

  constructor(private _http: HttpClient) { }

  getCabeceras() {
    const url = `https://utn-compras-api.herokuapp.com/cabeceras`;

    return this._http.get(url);
  }

  postCabecera(cabecera: any) {

    const URL = `https://utn-compras-api.herokuapp.com`;

    const body = JSON.stringify(cabecera);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    // console.log(body);
    const url = `${URL}/cabeceras`;
    // console.log(url);
    return this._http.post(url, body, {headers});
  }

  putCabecera(idCabecera: any, cabecera: any) {
    const URL = `https://utn-compras-api.herokuapp.com`;
    const body = JSON.stringify(cabecera);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    // console.log(body);
    const url = `${URL}/cabeceras/${idCabecera}`;
    console.log(url);
    return this._http.put(url, body, {headers});
  }

  deleteCabecera(idCabecera: any) {
    const URL = `https://utn-compras-api.herokuapp.com`;
    const url = `${URL}/cabeceras/${idCabecera}`;
    return this._http.delete(url);
  }


  getProveedores() {
    const url = `https://utn-compras-api.herokuapp.com/proveedor`;

    return this._http.get(url);
  }
}
