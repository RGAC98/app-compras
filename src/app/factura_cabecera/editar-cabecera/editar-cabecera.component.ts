import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CabeceraServicioService } from '../cabecera-cliente/cabecera-servicio.service';

@Component({
  selector: 'app-editar-cabecera',
  templateUrl: './editar-cabecera.component.html',
  styleUrls: ['./editar-cabecera.component.css'],
})
export class EditarCabeceraComponent implements OnInit {
  proveedorView: any[] = [];

  tipoPagoView: any[] = [{ value: 'false', viewValue: 'Contado' }];

  cabecera: any = {
    fcab_id: 0,
    fcab_prv_id: 0,
    fcab_fecha_init: '',
    fcab_fecha_fin: '',
    fcab_tipo_pago: '',
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: CabeceraId,
    private _cabeceraSV: CabeceraServicioService
  ) {
    this.cabecera.fcab_id = data.fcab_id;
    this.cabecera.fcab_prv_id = data.fcab_prv_id;
    this.cabecera.fcab_fecha_init = data.fcab_fecha_init;
    this.cabecera.fcab_fecha_fin = data.fcab_fecha_fin;
    this.cabecera.fcab_tipo_pago = data.fcab_tipo_pago;

    console.log(this.cabecera.fcab_prv_id);
    // console.log(this.cabecera.fcab_fecha_init);
  }

  proveedorSeleccionado: number;
  tipoPagoSeleccionado: boolean;
  fecha_inicio: Date;
  fecha_fin: Date;

  ngOnInit(): void {
    this.getProveedores();
  }

  validarProveedor() {
    // console.log(this.proveedorSeleccionado);
    // console.log(this.proveedorView);

    this.tipoPagoView = [{ value: 'false', viewValue: 'Contado' }];

    for (let index = 0; index < this.proveedorView.length; index++) {
      if (this.proveedorView[index].prv_id == this.proveedorSeleccionado) {
        // console.log(this.proveedorView[index].prv_tipo);

        if (this.proveedorView[index].prv_tipo == true) {
          this.tipoPagoView = [
            { value: 'true', viewValue: 'Crédito' },
            { value: 'false', viewValue: 'Contado' },
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

  updateCabecera() {
    let cabecera: Cabecera = {
      fcab_prv_id: this.proveedorSeleccionado,
      fcab_fecha_init: this.fecha_inicio,
      fcab_fecha_fin: this.fecha_fin,
      fcab_tipo_pago: this.tipoPagoSeleccionado,
    };
    console.log(cabecera);
    console.log(this.cabecera.fcab_id);    

    this._cabeceraSV.putCabecera(this.cabecera.fcab_id, cabecera).subscribe(
      (resp: any) => {
        console.log('Actualizado con exito!');
      },
      (error) => {
        console.warn(error);
      }
    );
  }
}

export interface Cabecera {
  fcab_prv_id: number;
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