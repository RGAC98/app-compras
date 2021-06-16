import { Component, OnInit } from '@angular/core';
import { Proveedor } from '../../model/model.proveedores';
import { ProveedoresService } from '../../services/proveedores.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditProveedorComponent } from '../edit-proveedor/edit-proveedor.component'
import { ReporteSaldosComponent } from '../reporte-saldos/reporte-saldos.component'

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  public form: FormGroup;

  proveedores: Proveedor[] = [];

  Columns: string[] = ['prv_id',
    'prv_dni',
    'prv_nombre',
    'prv_ciudad',
    'prv_tipo',
    'prv_direccion',
    'prv_telefono',
    'prv_email',
    'prv_estado',
    'Options'];

  tipos = [
    { tipo: 'Crédito' },
    { tipo: 'Contado' }
  ]

  estados = [
    { estado: 'Activo' },
    { estado: 'Inactivo' }
  ]

  //public dni: number;
  // public nombre: string;
  // public ciudad: string;
  public tipo: boolean;
  // public direccion: string;
  // public telefono: string;
  // public email: string;
  public estado: boolean;

  constructor(private proveedorService: ProveedoresService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getProveedor();
    this.form = this.formBuilder.group({
      cedula: [''],
      nombre: [''],
      ciudad: [''],
      tipoSelected: [],
      direccion: [''],
      telefono: [''],
      email: [''],
      estadoSelected: [],
    });
  }

  public getProveedor() {
    this.proveedorService.getProveedores().subscribe(
      (proveedor: any) => {
        this.proveedores = proveedor
        console.log(this.proveedores);

      },
      (error) => console.warn(error)
    )
  }

  public postProveedor() {

    if (this.form.value.tipoSelected == 'Crédito') {
      this.tipo = true;
    } else {
      this.tipo = false
    }

    if (this.form.value.estadoSelected == 'Activo') {
      this.estado = true;
    } else {
      this.estado = false
    }

    this.proveedorService.postProveedor(
      {
        //Envio los datos al post
        prv_dni: this.form.value.cedula,
        prv_nombre: this.form.value.nombre,
        prv_ciudad: this.form.value.ciudad,
        prv_tipo: this.tipo,
        prv_direccion: this.form.value.direccion,
        prv_telefono: this.form.value.telefono,
        prv_email: this.form.value.email,
        prv_estado: this.estado
      }
    ).subscribe(respuesta => {
      console.log('Proveedor creado');
      //Formulario reseteado
      //this.form.reset();
      //Se cargue los datos despues de enviar
      this.getProveedor();
    }
    );
  }

  public deleteProveedor(id) {
    this.proveedorService.deleteProveedor(
      id
    ).subscribe(respuesta => {
      console.log('Proveedor eliminado');
      //Formulario reseteado
      //this.form.reset();
      //Se cargue los datos despues de enviar
      this.getProveedor();
    }
    );
  }

  openDialog(id, dni, nombre, ciudad, tipo, direccion, telefono, email, estado) {
    const dialogRef = this.dialog.open(EditProveedorComponent, {
      data: {
        id: id,
        dni: dni,
        nombre: nombre,
        ciudad: ciudad,
        tipo: tipo,
        direccion: direccion,
        telefono: telefono,
        email: email,
        estado: estado
      },

      width: '500px',
      height: '590px',
      panelClass: 'my-class'
    });


    dialogRef.afterClosed().subscribe(result => {
      this.getProveedor();
    })
  }

  openDialogReporteSaldos() {
    const dialogRef = this.dialog.open(ReporteSaldosComponent, {
      data: {
      },

      width: '500px',
      height: '590px',
      panelClass: 'my-class'
    });


    dialogRef.afterClosed().subscribe(result => {
    })
  }

}
