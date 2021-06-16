import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {MatDialog} from '@angular/material/dialog';
import {Subject} from 'rxjs'
import {takeUntil} from 'rxjs/operators'

import { jsPDF } from "jspdf";
import html2canvas from "html2canvas"

//componentes y servicios
import {ApiComprasService} from '../../_services/api-compras.service'
import {InventarioComponent} from '../inventario/inventario.component'
import {ApiInventarioService} from '../../_services/api-inventario.service'
import {ProductoComponent} from '../producto/producto.component'

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})

export class DetalleComponent implements OnInit, OnDestroy 
{
  //variable para almacenar el dato enviado por url
  fcab_id: any

  //variables para almacenar respuestas de apis
  cabecera: any
  productos: Array<any> = []
  inventario: Array<any> = []

  //para desuscribirse del consumo
  private unsuscribe$ = new Subject<void>();

  //variables para el html 
  fecha_inicio: string
  fecha_fin: string

  sumaTotal: any;

  //datos de la tabla
  columnas: string[] = ['CODIGO', 'CANTIDAD', 'PVP', 'IVA', 'ACCIONES']

  constructor(private parametro: ActivatedRoute, 
              private compras_api: ApiComprasService, 
              private dialog: MatDialog,
              private inventario_api: ApiInventarioService) 
  {
    this.fcab_id = this.parametro.snapshot.paramMap.get('fcab_id')
    this.ObtenerCabecera()
    this.ObtenerProductos()
    this.ObtenerInventario()
  }

  ngOnInit(): void 
  {}

  ngOnDestroy(): void
  {
    this.unsuscribe$.next();
    this.unsuscribe$.complete();
  }

  ObtenerCabecera()
  {
    this.compras_api.getFacturaCabeceraByID(this.fcab_id)
    .pipe(takeUntil(this.unsuscribe$))
    .subscribe((respuesta: any) => {
      this.cabecera = respuesta.fac_cabecera
      console.log("Cabecera obtenida: ",this.cabecera);
      this.fecha_inicio = this.obtenerFecha(this.cabecera.fcab_fecha_init)
      this.fecha_fin = this.obtenerFecha(this.cabecera.fcab_fecha_fin)
    })
  }

  ObtenerProductos()
  {
    this.compras_api.getProductosDeUnaCabecera(this.fcab_id)
    .pipe(takeUntil(this.unsuscribe$))
    .subscribe((respuesta: any) => {
      this.productos = respuesta.productos
      console.log("Productos obtenidos",this.productos);
      this.ActualizarProductos()
    })
  }

  ObtenerInventario()
  {
    this.inventario_api.getObtenerInventario()
    .pipe(takeUntil(this.unsuscribe$))
    .subscribe((respuesta: any) => {
      this.inventario = respuesta
      console.log("Inventario obtenido", this.inventario)
      this.ActualizarProductos()
    })
  }

  ActualizarProductos()
  {
    var productos2 = []
    for (let i = 0; i < this.productos.length; i++) 
    {
      for (let j = 0; j < this.inventario.length; j++) 
      {
        if(this.productos[i].fpro_producto == this.inventario[j].codigo_pro)
        {
          var producto = {
            fpro_cantidad: this.productos[i].fpro_cantidad,
            fpro_iva: this.productos[i].fpro_iva,
            fpro_producto: this.productos[i].fpro_producto,
            fpro_pvp: this.productos[i].fpro_pvp,
            fpro_nombre: this.inventario[j].nombre_pro
          }
          productos2.push(producto)
          break
        }   
      }
    }
    this.productos = productos2
  }

  obtenerFecha(fcab_fecha)
  {
    var fecha_iso = fcab_fecha+""
    var fecha = fecha_iso.substring(0,10)
    return fecha
  }

  abrirDialog(fcab_id, fdet_id)
  {
    var cab_id = fcab_id
    var det_id = fdet_id
    const dialogo = this.dialog.open(InventarioComponent, {
      data: {
        mensaje: 'Inventario',
        fcab_id: cab_id,
        fdet_id: det_id
      },
      width: '500px',
      height: '590px',
      panelClass: 'my-class'
    });
    dialogo.afterClosed().subscribe(resultado => {})
  }

  abrirDialogProducto(prducto_codigo, producto_accion)
  {
    var codigo = prducto_codigo
    var accion = producto_accion
    const dialogo = this.dialog.open(ProductoComponent, {
      data: {
        codigo: codigo,
        accion: accion,
        fcab_id: this.cabecera.fcab_id,
        fdet_id: this.cabecera.fdet_id
      },
      width: '500px',
      height: '590px',
      panelClass: 'my-class'
    });
    dialogo.afterClosed().subscribe(resultado => {})
  }

  calcularTotal(){
    console.log("CALCULANDO TOTAL: ");

    console.log('PRODUCTOS: ',this.productos);
    
    
    let suma = 0;
    for (let index = 0; index < this.productos.length; index++) {
      // suma+= (this.productos[index].fpro_pvp*this.productos[index].fpro_cantidad)+((this.productos[index].fpro_pvp*this.productos[index].fpro_cantidad)*this.productos[index].fpro_iva)
      console.log('SUMAAA: ', this.productos[index].fpro_pvp);
      
    }
    this.sumaTotal = suma;
  }

  downloadPDF() {
    // pdf
    var element = document.getElementById('pdf')

    html2canvas(element).then((canvas) => {
      var imgData = canvas.toDataURL('image/png')

      var doc: jsPDF = new jsPDF()

      var imgHeight = canvas.height * 208 / canvas.width;

      doc.addImage(imgData, 0, 0, 208, imgHeight)

      doc.save("image.pdf")
    })

  }

}
