import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {ApiComprasService} from '../../_services/api-compras.service'
import {MatDialog} from '@angular/material/dialog';
import {InventarioComponent} from '../inventario/inventario.component'

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

  //variables para el html 
  fecha_inicio: string
  fecha_fin: string

  //datos de la tabla
  columnas: string[] = ['CODIGO', 'CANTIDAD', 'PVP', 'IVA', 'ACCIONES']

  constructor(private parametro: ActivatedRoute, private compras_api: ApiComprasService, private dialog: MatDialog) 
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
      this.fecha_inicio = this.obtenerFecha(this.cabecera.fcab_fecha_init)
      this.fecha_fin = this.obtenerFecha(this.cabecera.fcab_fecha_fin)
    })
  }

  ObtenerProductos()
  {
    this.compras_api.getProductosDeUnaCabecera(this.fcab_id).subscribe((respuesta: any) => {
      this.productos = respuesta.productos
      console.log(this.productos);
    })
  }

  obtenerFecha(fcab_fecha)
  {
    var fecha_iso = fcab_fecha+""
    var fecha = fecha_iso.substring(0,10)
    return fecha
  }

  abrirDialog()
  {
    const dialogo = this.dialog.open(InventarioComponent, {
      data: {
        mensaje: 'Inventario'
      },
      width: '500px',
      height: '590px',
      panelClass: 'my-class'
    });
    dialogo.afterClosed().subscribe(resultado => {})
  }
}
