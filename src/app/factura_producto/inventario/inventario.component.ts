import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog'
import {ApiInventarioService} from '../../_services/api-inventario.service'

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})

export class InventarioComponent implements OnInit 
{
  //variables para almacenar el mensaje del dialog
  mensaje: string

  //variable para obtener inventario del api
  inventario: Array<any> = []

  constructor(@Inject(MAT_DIALOG_DATA) private data: DataDialog, private inventario_api: ApiInventarioService) 
  {
    this.mensaje = this.data.mensaje
    console.log(this.mensaje);
    this.ObtenerInventario()
  }

  ngOnInit(): void 
  {}

  ObtenerInventario()
  {
    this.inventario_api.getObtenerInventario().subscribe((respuesta: any) => {
      this.inventario = respuesta
      console.log(this.inventario);
      
    })
  }
}

export interface DataDialog
{
  mensaje: string;
}