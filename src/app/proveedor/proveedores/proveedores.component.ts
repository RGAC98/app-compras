import { Component, OnInit } from '@angular/core';
import {ProveedoresService} from '..//..//_services/proveedores.service'
@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit 
{
  dni: string
  nombre: string
  ciudad: string
  tipo: boolean
  direccion: string
  telefono: string
  email: string
  estado: boolean

  datos_recibido: any
  listaProveedores = []

  constructor(private proveedores_servicios: ProveedoresService) 
  {}

  ngOnInit(): void 
  {
    this.ObtenerProveedores()
  }

  CrearProveedor()
  {
    console.log("RECIBIDO DEL HTML: ", this.dni, this.nombre)
    this.proveedores_servicios.postCrearProveedor(this.dni, this.nombre, this.ciudad, this.tipo, 
      this.direccion, this.telefono, this.email, this.estado).subscribe(recibido => {
        this.datos_recibido = recibido
        console.log(this.datos_recibido)
      }
    )
  }

  ObtenerProveedores()
  {
    this.proveedores_servicios.getProveedores().subscribe(recibido => {
        this.datos_recibido = recibido
        this.listaProveedores = this.datos_recibido
        console.log(this.listaProveedores)
      }
    )
  }

}