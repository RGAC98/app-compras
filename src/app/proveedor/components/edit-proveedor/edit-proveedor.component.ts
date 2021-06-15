import { Component, Inject, OnInit } from '@angular/core';
import { Proveedor } from '../../model/model.proveedores'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProveedoresService } from '../../services/proveedores.service';


@Component({
  selector: 'app-edit-proveedor',
  templateUrl: './edit-proveedor.component.html',
  styleUrls: ['./edit-proveedor.component.css']
})

export class EditProveedorComponent implements OnInit {

  public form: FormGroup;

  proveedores: Proveedor[] = [];

  public id: number;
  public dni: string;
  public nombre: string;
  public ciudad: string;
  public tipo: boolean;
  public direccion: string;
  public telefono: string;
  public email: string;
  public estado: boolean;

  tipos = [
    { tipo: 'Crédito' },
    { tipo: 'Contado' }
  ]

  estados = [
    { estado: 'Activo' },
    { estado: 'Inactivo' }
  ]

  constructor(public dialogRef: MatDialogRef<EditProveedorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private proveedorService: ProveedoresService) {
    // this.id = this.data.prv_id,
    //   this.dni = this.data.prv_dni,
    //   this.nombre = this.data.prv_nombre,
    //   this.ciudad = this.data.prv_ciudad,
    //   this.tipo = this.data.prv_tipo,
    //   this.direccion = this.data.prv_direccion,
    //   this.telefono = this.data.prv_telefono,
    //   this.email = this.data.prv_email,
    //   this.estado = this.data.prv_estado
    //console.log(data.id);

  }

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

  public putProveedor() {
    
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

    this.proveedorService.putProveedor(
      {
        prv_id: this.data.id,
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
      console.log('Proveedor actualizado');
    }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
