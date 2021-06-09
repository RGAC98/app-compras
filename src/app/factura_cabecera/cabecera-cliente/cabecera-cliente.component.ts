import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CabeceraServicioService } from './cabecera-servicio.service';

@Component({
  selector: 'app-cabecera-cliente',
  templateUrl: './cabecera-cliente.component.html',
  styleUrls: ['./cabecera-cliente.component.css']
})
export class CabeceraClienteComponent implements OnInit {

  constructor(private _cabeceraSV: CabeceraServicioService) { }

  fuente: MatTableDataSource<Cabecera>;

  displayedColumns: string[] = ['cabecera_id', 'proveedor_id', 'Fecha_realizacion', 'Fecha_fin', 'Tipo_pago', 'acciones'];

  ngOnInit(): void {
    this.getCabeceras()
    console.log(this.fuente);
    
  }

  getCabeceras() {
    this._cabeceraSV.getCabeceras().subscribe(
      (resp: any) => {
        this.fuente = resp.cabeceras
      },
      (error) => {
        console.warn(error);
      }
    );
  }

}

export interface Cabecera {
  fcab_id: number;
  fcab_prv_id: number;
  fcab_fecha_init: Date;
  fcab_fecha_fin: Date;
  fcab_tipo_pago: string;
}
