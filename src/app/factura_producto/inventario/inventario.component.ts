import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog'


@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})

export class InventarioComponent implements OnInit 
{
  mensaje: string

  constructor(@Inject(MAT_DIALOG_DATA) private data: DataDialog) 
  {
    this.mensaje = this.data.mensaje
    console.log(this.mensaje);
  }

  ngOnInit(): void 
  {}
}

export interface DataDialog
{
  mensaje: string;
}