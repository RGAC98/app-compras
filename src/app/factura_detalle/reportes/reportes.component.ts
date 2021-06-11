import { Component, OnInit } from '@angular/core';
import {ApiComprasService} from '../../_services/api-compras.service'

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})

export class ReportesComponent implements OnInit 
{
  dni: any
  reporte: Array<any> = []

  constructor(private compras_api: ApiComprasService) 
  {}

  ngOnInit(): void 
  {}
   
  ObtenerFacturasDetallePorProveedorDNI()
  {
    console.log(this.dni)
    this.compras_api.getFacturaDetallePorProveedorDNI(this.dni).subscribe((respuesta: any) =>{
      this.reporte = respuesta.facturas
      console.log(this.reporte)
    })
  }

}
