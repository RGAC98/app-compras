import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CabeceraServicioService } from './cabecera-servicio.service';

@Component({
  selector: 'app-cabecera-cliente',
  templateUrl: './cabecera-cliente.component.html',
  styleUrls: ['./cabecera-cliente.component.css']
})
export class CabeceraClienteComponent implements OnInit {

  tipoPagoView: any[] = [
    { value: "true", viewValue: "Crédito" },
    { value: "false", viewValue: "Contado" },
  ];

  proveedorView: any[] = [];
    // { value: "1", viewValue: "Dennis" },
    // { value: "2", viewValue: "Lucia" },
  cabecerasList: CabeceraId[] = [];
  cabecerasList2: Cabecera[] = [];

  proveedorSeleccionado: number;
  tipoPagoSeleccionado: boolean;
  fecha_inicio: Date;
  fecha_fin: Date;

  constructor(private _cabeceraSV: CabeceraServicioService) { }

  fuente: MatTableDataSource<Cabecera>;

  displayedColumns: string[] = ['cabecera_id', 'proveedor_name', 'Fecha_realizacion', 'Fecha_fin', 'Tipo_pago', 'acciones'];

  ngOnInit(): void {
    this.getProveedores();
    this.getCabeceras()
  }

  getCabeceras() {
    this._cabeceraSV.getCabeceras().subscribe(
      (resp: any) => {
        // this.fuente = resp.cabeceras
        this.cabecerasList = resp.cabeceras

        console.log(this.proveedorView);
        

        for (let index = 0; index < this.cabecerasList.length; index++) {
            for (let jindex = 0; jindex < this.proveedorView.length; jindex++) {
              if (this.cabecerasList[index].fcab_prv_id == this.proveedorView[jindex].prv_id) {
                let cab: Cabecera = {
                  fcab_id: this.cabecerasList[index].fcab_id,
                  fcab_name: this.proveedorView[jindex].prv_nombre,
                  fcab_fecha_init: this.cabecerasList[index].fcab_fecha_init,
                  fcab_fecha_fin: this.cabecerasList[index].fcab_fecha_fin,
                  fcab_tipo_pago: this.cabecerasList[index].fcab_tipo_pago
                }       
                console.log(cab);
                         
                this.cabecerasList2.push(cab)
              }
              
            }
          
        }
        console.log(this.cabecerasList2);
        
      },
      (error) => {
        console.warn(error);
      }
    );
  }

  getProveedores() {
    this._cabeceraSV.getProveedores().subscribe(
      (resp: any) => {
        this.proveedorView = resp;
      },
      (error) => {
        console.warn(error);
      }
    );
  }

  insertarCabecera(){
    let cabecera: any = {
      fcab_prv_id: this.proveedorSeleccionado,
      fcab_fecha_init: this.fecha_inicio,
      fcab_fecha_fin: this.fecha_fin,
      fcab_tipo_pago: this.tipoPagoSeleccionado
    }
    this._cabeceraSV.postCabecera(cabecera).subscribe(
      (resp: any) => {
        console.log('Insertada cabecera con exito!');
        
      },
      (error) => {
        console.warn(error);
      }
    );;
  }


}

export interface Cabecera {
  fcab_id: number;
  fcab_name: string;
  fcab_fecha_init: Date;
  fcab_fecha_fin: Date;
  fcab_tipo_pago: boolean;
}

export interface CabeceraId {
  fcab_id: number;
  fcab_prv_id: number;
  fcab_fecha_init: Date;
  fcab_fecha_fin: Date;
  fcab_tipo_pago: boolean;
}

// fcab_prv_id
