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

        // console.log(this.proveedorView);
        

        for (let index = 0; index < this.cabecerasList.length; index++) {
            for (let jindex = 0; jindex < this.proveedorView.length; jindex++) {
              if (this.cabecerasList[index].fcab_prv_id == this.proveedorView[jindex].prv_id) {
                let cab: Cabecera = {
                  fcab_id: this.cabecerasList[index].fcab_id,
                  fcab_name: this.proveedorView[jindex].prv_nombre,
                  fcab_fecha_init: this.obtenerFecha(this.cabecerasList[index].fcab_fecha_init),
                  fcab_fecha_fin: this.obtenerFecha(this.cabecerasList[index].fcab_fecha_fin),
                  fcab_tipo_pago: this.cabecerasList[index].fcab_tipo_pago
                }       
                // console.log(cab);
                         
                this.cabecerasList2.push(cab)
              }
              
            }
          
        }
        // console.log(this.cabecerasList2);
        
      },
      (error) => {
        console.warn(error);
      }
    );
  }

  validarProveedor() {
    console.log(this.proveedorSeleccionado);
    console.log(this.proveedorView);

    this.tipoPagoView = [
      { value: "false", viewValue: "Contado" },
    ];

    for (let index = 0; index < this.proveedorView.length; index++) {
      if (this.proveedorView[index].prv_id == this.proveedorSeleccionado) {
        
        // console.log(this.proveedorView[index].prv_tipo);
        
        if (this.proveedorView[index].prv_tipo == true) {
          this.tipoPagoView = [
            { value: "true", viewValue: "Crédito" },
            { value: "false", viewValue: "Contado" },
          ];
          break;
        }
      }
    }
    
    
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

  obtenerFecha(fcab_fecha)
  {
    var fecha_iso = fcab_fecha+""
    var fecha = fecha_iso.substring(0,10)
    return fecha
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
        this.cabecerasList = []
        this.cabecerasList2 = []
        this.getCabeceras();

        this.proveedorSeleccionado = 0
        this.fecha_fin = undefined;
        this.fecha_inicio = undefined;
        this.tipoPagoSeleccionado = false
      },
      (error) => {
        console.warn(error);
      }
    );
    
  }

  deleteCabecera(idCabecera) {
    console.log(idCabecera);
    
    this._cabeceraSV.deleteCabecera(idCabecera).subscribe(
      (resp: any) => {
        console.log(resp);
        this.cabecerasList = []
        this.cabecerasList2 = []
        this.getCabeceras();

        this.proveedorSeleccionado = 0
        this.fecha_fin = undefined;
        this.fecha_inicio = undefined;
        this.tipoPagoSeleccionado = false
      },
      (error) => {
        console.warn(error);
      }
    );
    
  }

}

export interface Cabecera {
  fcab_id: number;
  fcab_name: string;
  fcab_fecha_init: any;
  fcab_fecha_fin: any;
  fcab_tipo_pago: boolean;
}

export interface CabeceraId {
  fcab_id: number;
  fcab_prv_id: number;
  fcab_fecha_init: string;
  fcab_fecha_fin: string;
  fcab_tipo_pago: boolean;
}

// fcab_prv_id

