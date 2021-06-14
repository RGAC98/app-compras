import { Component, OnInit } from '@angular/core';
import { Proveedor } from '../../model/model.proveedores';
import { ProveedoresService } from '../../services/proveedores.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

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


  constructor(private proveedorService: ProveedoresService
  ) { }

  ngOnInit(): void {
    this.getProveedor();
  }

  public getProveedor(){
    this.proveedorService.getProveedores().subscribe(
      (proveedor: any) => {
        this.proveedores = proveedor
        console.log(this.proveedores);
        
      },
      (error) => console.warn(error)
    )
  }

}
