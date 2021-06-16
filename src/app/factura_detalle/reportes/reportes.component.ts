import { Component, OnInit } from '@angular/core';
import {ApiComprasService} from '../../_services/api-compras.service'

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})

export class ReportesComponent implements OnInit 
{
  // dni: any
  // nroFactura: any
  // codigoProducto: any
  buscador: any
  parametro: any
  reporte: Array<any> = []

  constructor(private compras_api: ApiComprasService) 
  {}

  ngOnInit(): void 
  {}
   
  Filtro()
  {
    if (this.parametro == 'Proveedor') {
      this.ObtenerFacturasDetallePorProveedorDNI()
    }else{
      if (this.parametro == 'nroFactura') {
        this.ObtenerFacturasDetallePorNroFactura()
      }else{
        this.ObtenerFacturasDetallePorCodigoProducto()
      }
    }
  }

  ObtenerFacturasDetallePorProveedorDNI()
  {
    // console.log(this.dni)
    this.compras_api.getFacturaDetallePorProveedorDNI(this.buscador).subscribe((respuesta: any) =>{
      this.reporte = respuesta.facturas
      this.reemplazarFechas(this.reporte)
      // console.log(this.reporte)
    })
  }

  ObtenerFacturasDetallePorNroFactura()
  {
    // console.log(this.nroFactura)
    this.compras_api.getFacturaDetallePorNroFactura(this.buscador).subscribe((respuesta: any) =>{
      this.reporte = respuesta.facturas
      this.reemplazarFechas(this.reporte)
      // console.log(this.reporte)
    })
  }

  ObtenerFacturasDetallePorCodigoProducto()
  {
    // console.log(this.codigoProducto)
    this.compras_api.getFacturaDetallePorCodigoProducto(this.buscador).subscribe((respuesta: any) =>{
      this.reporte = respuesta.facturas
      this.reemplazarFechas(this.reporte)
      // console.log(this.reporte)
    })
  }

  obtenerFecha(fcab_fecha)
  {
    var fecha_iso = fcab_fecha+""
    var fecha = fecha_iso.substring(0,10)
    return fecha
  }

  reemplazarFechas(lista)
  {
    for (let i = 0; i < lista.length; i++) {
      lista[i].fcab_fecha_init = this.obtenerFecha(lista[i].fcab_fecha_init)
      lista[i].fcab_fecha_fin = this.obtenerFecha(lista[i].fcab_fecha_fin)
    }
    this.reporte=lista
  }
}
