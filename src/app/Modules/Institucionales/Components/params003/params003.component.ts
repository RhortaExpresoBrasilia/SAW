import { Component, OnInit } from '@angular/core';
import { TableMipres } from 'src/app/models/user-data';
import { TableReportMipresService } from 'src/app/Modules/Institucionales/Services/tableReportMipres.service';

@Component({
  selector: 'app-params003',
  templateUrl: './params003.component.html',
  styleUrls: ['./params003.component.css']
})
export class Params003Component implements OnInit {
  dataToTable: TableMipres[] = [];
  buttonsDisabled: any = {
    direccionamiento: true,
    programacion: true,
    entrega: true,
    reporteEntrega: true,
    facturacion: true,
  }

  loading: boolean = false;
  color: string = 'primary';
  displayedColumns: string[] = [
    '# Bono', 'Prescripcion', '# Entrega', 'Direccionamiento', 'Cliente credito', 'Valor',
    'Paciente', 'Nro factura', 'Nap', 'Orden', 'Fecha de entrega', 'Programacion', 'Entrega',
    'ReporteEntrega', 'Facturacion'
  ];


  constructor(private _apiTable: TableReportMipresService) { }

  ngOnInit() {
  }

  test(): void {
    alert('test');
  }

 

  onDataReceived(data: any) {
    this.dataToTable = data;
    
    this.loading = false;
  }

  habilitar(data: any) {
    this.buttonsDisabled = data;
  }

  validateNull(bonos: any) {
    let contadorDireccionamiento = 0;
    let bonosTotal = 0;

    for (let objeto of bonos) {
      if (objeto.Direccionamiento !== "0") {
        contadorDireccionamiento++;
      }
      if (objeto.Direccionamiento) {
        bonosTotal++;
      }
    }

    if (contadorDireccionamiento === bonosTotal) {
      // this.buttonsDisabled = {
      //   direccionamiento: false,
      //   programacion: false,
      //   entrega: true,
      //   reporteEntrega: true,
      //   facturacion: true,
      // }
    }
  }
  getAddressings() {

    this.loading = true;
    this._apiTable.getAddressingsList(this.convertListBonos()).subscribe((response) => {
      this.getDatatoTable();
      this.buttonsDisabled = {
        direccionamiento: true,
        programacion: false,
        entrega: true,
        reporteEntrega: true,
        facturacion: true,
      }
      this.loading = false;
    })
  }

  getProgramming() {
    this.loading = true;
    this._apiTable.getProgramming(this.convertListBonos()).subscribe((response) => {
      this.getDatatoTable();
      this.buttonsDisabled = {
        direccionamiento: true,
        programacion: true,
        entrega: false,
        reporteEntrega: true,
        facturacion: true,
      }
    }, (err) => {
      
    })
  }

  getEntrega() {
  this.loading = true;
  this._apiTable.getDelivery(this.convertListBonos()).subscribe((response) => {
    this.getDatatoTable();
    // this.buttonsDisabled = {
    //   direccionamiento: true,
    //   programacion: true,
    //   entrega: true,
    //   reporteEntrega: false,
    //   facturacion: true,
    // }
  }, (err) => {
    
  })
  }

  reporteEntrega():void{
    this.loading = true;
    this._apiTable.getReporteEntrega(this.convertListBonos()).subscribe((response:any)=>{
      this.getDatatoTable();
      this.buttonsDisabled = {
        direccionamiento: true,
        programacion: true,
        entrega: true,
        reporteEntrega: true,
        facturacion: false,
      }
    })
  }
  getFacturacion(){
    this._apiTable.getFacturacion(this.convertListBonos()).subscribe((response:any)=>{
      this.getDatatoTable();
    })
  }

  getDatatoTable() {
    this.loading = true;
    this._apiTable.getDataTableReportMipres(this.convertListBonos()).subscribe((response) => {
      this.onDataReceived(response);
      this.validateNull(response);
    });
  }

  convertListBonos() {
    const bonosString = localStorage.getItem('listadoBonos');
    const listadoDeBonos = JSON.parse(bonosString!);
    return listadoDeBonos;
  }

  transformData(listBonos:any){
    const data = this._apiTable.exportDataTableReport(listBonos);
    
    this.onDataReceived(data);
    this.loading= false;
  }
}
