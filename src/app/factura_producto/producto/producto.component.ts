import {Component, OnInit, OnDestroy, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Subject} from 'rxjs'
import {takeUntil} from 'rxjs/operators'

import {ApiInventarioService} from '../../_services/api-inventario.service'
import {ApiComprasService} from '../../_services/api-compras.service'

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})

export class ProductoComponent implements OnInit, OnDestroy 
{
  //variable para desuscibirse del consumo api
  private unsuscribe = new Subject<void>();

  //variable para almacenar el dato que recibo de otros componentes
  producto_codigo: any;
  accion: any
  fcab_id: any
  fdet_id: any

  //varibales para almacenar la respuesta del api
  producto: any

  //variables para almacenar datos desde el html
  cantidad: any

  constructor(private inventario_api: ApiInventarioService, @Inject(MAT_DIALOG_DATA) private data: DataDialog, private api_compras: ApiComprasService)
  {
    this.producto_codigo = this.data.codigo
    this.accion = this.data.accion
    this.fcab_id = this.data.fcab_id
    this.fdet_id = this.data.fdet_id
    console.log("Datos obtenidos: ",this.producto_codigo, " ", this.accion, this.fcab_id, this.fdet_id);
    this.ObtenerProducto()
  }

  ngOnInit(): void 
  {}

  ngOnDestroy(): void
  {
    this.unsuscribe.next();
    this.unsuscribe.complete()
  }

  ObtenerProducto()
  {
    this.inventario_api.getObtenerProducto(this.producto_codigo)
    .pipe(takeUntil(this.unsuscribe))
    .subscribe((respuesta: any) => {
      this.producto = respuesta[0]
    })
  }

  IngresarProducto()
  {
    if(this.producto.iva_pro == true)
    {
      this.api_compras.postIngresarProducto(this.fcab_id, this.fdet_id, this.cantidad, this.producto_codigo, this.producto.pvp_pro, 0.12)
      .pipe(takeUntil(this.unsuscribe))
      .subscribe((respuesta: any)=> {
        console.log(respuesta)
      })
    }else
    {
      this.api_compras.postIngresarProducto(this.fcab_id, this.fdet_id, this.cantidad, this.producto_codigo, this.producto.pvp_pro, 0.0)
      .pipe(takeUntil(this.unsuscribe))
      .subscribe((respuesta: any)=> {
        console.log(respuesta)
      })
    }
  }

  ActualizarProducto()
  {
    this.api_compras.putActualizarProducto(this.fcab_id, this.fdet_id, this.producto_codigo, this.cantidad)
    .pipe(takeUntil(this.unsuscribe))
    .subscribe((respuesta: any) => {
      console.log(respuesta);
    })
  }

  EliminarProducto()
  {
    this.api_compras.deleteEliminarProducto(this.fcab_id, this.fdet_id, this.producto_codigo)
    .pipe(takeUntil(this.unsuscribe))
    .subscribe((respuesta: any) => {
      console.log(respuesta)
    })
  }
}

export interface DataDialog
{
  codigo: any,
  accion: any,
  fcab_id: any,
  fdet_id: any
}