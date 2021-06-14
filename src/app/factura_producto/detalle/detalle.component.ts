import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {ApiComprasService} from '../../_services/api-compras.service'
import * as moment from 'moment';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})

export class DetalleComponent implements OnInit 
{
  fcab_id: any
  cabecera: any
  productos: Array<any> = []

  //datos de la tabla
  columnas: string[] = ['Codigo', 'Cantidad', 'PVP', 'IVA', 'ACCIONES']

  constructor(private parametro: ActivatedRoute, private compras_api: ApiComprasService) 
  {
    this.fcab_id = this.parametro.snapshot.paramMap.get('fcab_id')
    this.ObtenerCabecera()
  }

  ngOnInit(): void 
  {
    this.ObtenerProductos()
  }

  ObtenerCabecera()
  {
    this.compras_api.getFacturaCabeceraByID(this.fcab_id).subscribe((respuesta: any) => {
      this.cabecera = respuesta.fac_cabecera
      console.log(this.cabecera);
    })
  }

  ObtenerProductos()
  {
    this.compras_api.getProductosDeUnaCabecera(this.fcab_id).subscribe((respuesta: any) => {
      this.productos = respuesta.productos
      console.log(this.productos);
    })
  }
}
