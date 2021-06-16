import {Component, Inject, OnInit, OnDestroy} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog'
import {Subject} from 'rxjs'
import {takeUntil} from 'rxjs/operators'

import {ApiInventarioService} from '../../_services/api-inventario.service'
import {ProductoComponent} from '../producto/producto.component'

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})

export class InventarioComponent implements OnInit, OnDestroy 
{
  //variables para almacenar el mensaje del dialog
  mensaje: string
  fcab_id: any
  fdet_id: any

  //variable para obtener inventario del api
  inventario: Array<any> = []

  //variable para desuscribirse del consumo
  private unsuscribe$ = new Subject<void>();

  constructor(@Inject(MAT_DIALOG_DATA) private data: DataDialog, private inventario_api: ApiInventarioService, private dialog: MatDialog) 
  {
    this.mensaje = this.data.mensaje
    this.fcab_id = this.data.fcab_id
    this.fdet_id = this.data.fdet_id
    console.log("Datos obtenidos de detalle: ",this.mensaje, this.fcab_id, this.fdet_id);
    this.ObtenerInventario()
  }

  ngOnInit(): void 
  {}

  ngOnDestroy(): void
  {
    this.unsuscribe$.next();
    this.unsuscribe$.complete();
  }

  ObtenerInventario()
  {
    this.inventario_api.getObtenerInventario()
    .pipe(takeUntil(this.unsuscribe$))
    .subscribe((respuesta: any) => {
      this.inventario = respuesta
    })
  }

  abrirDialog(prducto_codigo)
  {
    var codigo = prducto_codigo
    const dialogo = this.dialog.open(ProductoComponent, {
      data: {
        codigo: codigo,
        accion: 'insertar',
        fcab_id: this.fcab_id,
        fdet_id: this.fdet_id
      },
      width: '500px',
      height: '590px',
      panelClass: 'my-class'
    });
    dialogo.afterClosed().subscribe(resultado => {})
  }
}

export interface DataDialog
{
  mensaje: string,
  fcab_id: any,
  fdet_id: any
}