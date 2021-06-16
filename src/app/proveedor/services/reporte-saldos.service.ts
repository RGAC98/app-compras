import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReporteSaldosService {

  constructor(private http: HttpClient) { }

  public getReporteSaldos() {
    const url = `https://utn-prestamo-api.herokuapp.com/cuentasporpagartotales`;
    return this.http.get(url);
  }
}
