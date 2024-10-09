import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
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
  selectedValue: string | null = null;
  loading: boolean = false;
  color: string = 'primary';
  displayedColumns: string[] = [
    '# Bono', 'Prescripcion', '# Entrega', 'Direccionamiento', 'Cliente credito', 'Valor',
    'Paciente', 'Nro factura', 'Nap', 'Orden', 'Fecha de entrega', 'Programacion', 'Entrega',
    'ReporteEntrega', 'Facturacion'
  ];

  buttons = [
    { key: 'direccionamiento', label: 'Direccionamiento', icon: 'assignment' },
    { key: 'programacion', label: 'Programacion', icon: 'schedule' },
    { key: 'entrega', label: 'Entrega', icon: 'local_shipping' },
    { key: 'reporteEntrega', label: 'Reporte entrega', icon: 'report' },
    { key: 'facturacion', label: 'Facturacion', icon: 'receipt' },
  ];


  constructor(private _apiTable: TableReportMipresService, private cdr: ChangeDetectorRef) { 
    this.selectedValue = 'hiddenButton';
  }

  ngOnInit() {
    this.selectedValue = null; // Asegúrate de que este valor es correcto
    console.log('Valor inicial de selectedValue:', this.selectedValue);
  }

  test(): void {
    alert('test');
  }

  ngAfterViewInit() {
    this.selectedValue = 'hiddenButton';
    this.cdr.detectChanges();
  }

  onToggleChange(event: MatButtonToggleChange) {
    this.selectedValue = event.value; // Asigna el valor seleccionado
    console.log("Cambio detectado: ", this.selectedValue);
    if (this.selectedValue === 'hiddenButton') {
      return;
  }
    if (this.selectedValue) {
      switch (this.selectedValue) {
        case 'direccionamiento':
          this.getAddressings();
          break;
        case 'programacion':
          this.getProgramming();
          break;
        case 'entrega':
          this.getEntrega();
          break;
        case 'reporteEntrega':
          this.reporteEntrega();
          break;
        case 'facturacion':
          this.getFacturacion();
          break;
        default:
          console.log("Opción no válida");
          break;
      }
    }
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

  reporteEntrega(): void {
    this.loading = true;
    this._apiTable.getReporteEntrega(this.convertListBonos()).subscribe((response: any) => {
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
  getFacturacion() {
    this._apiTable.getFacturacion(this.convertListBonos()).subscribe((response: any) => {
      console.log(response);
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

  transformData(listBonos: any) {
    const data = this._apiTable.exportDataTableReport(listBonos);

    this.onDataReceived(data);
    this.loading = false;
  }
}
