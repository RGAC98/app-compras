import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { ReporteSaldos } from '../../model/model.reporte-saldos';
import { ReporteSaldosService } from '../../services/reporte-saldos.service';

@Component({
  selector: 'app-reporte-saldos',
  templateUrl: './reporte-saldos.component.html',
  styleUrls: ['./reporte-saldos.component.css']
})
export class ReporteSaldosComponent implements OnInit {

  reporteSaldo: ReporteSaldos[]=[]; 

  Columns: string[] = ['Cedula',
    'Saldo'];

  constructor(public dialogRef: MatDialogRef<ReporteSaldosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private reporteSaldosService: ReporteSaldosService,
  ) { }

  ngOnInit(): void {
    this.getReporteSaldo();
  }

  public getReporteSaldo() {
    this.reporteSaldosService.getReporteSaldos().subscribe(
      (rSaldo: any) => {
        this.reporteSaldo = rSaldo
        console.log(this.reporteSaldo);

      },
      (error) => console.warn(error)
    )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
