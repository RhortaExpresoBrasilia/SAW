import { Component, OnInit } from '@angular/core';
import { TableListBonos, TableUpdateBonnus } from 'src/app/models/user-data';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-Params005',
  templateUrl: './Params005.component.html',
  styleUrls: ['./Params005.component.css']
})
export class Params005Component implements OnInit {
  dataToTable: TableUpdateBonnus[] = [];
  dataToTableDownload: TableListBonos[] = [];
  dataToTableDownload2: TableListBonos[] = [];
  loading: boolean = false;
  displayTable: boolean = false;
  displayedColumns: string[] = [
    'Numero de Bono',
    'Origen',
    'Destino',
    'Nombre del Paciente',
    'Valor'
  ]
  constructor() { }

  ngOnInit() {
  }

  onDataReceived(data: any) {
    this.dataToTable = data;
    console.log(data);

    this.loading = false;
  }
  onDataReceivedDataToDownload(data: any) {
    this.transformDataToDowload(data);
    this.loading = false;
  }

  onDataToRecivedDataTable(data:any){
    this.dataToTableDownload2 = data;
  }
  transformDataToDowload(data: any) {
    const newArray: TableListBonos[] = [];
    data.forEach((element: any) => {

      const item: TableListBonos = {
        'Numero de Bono': element.numBono,
        'Identificacion del paciente': element.nidPac,
        'Nombre del Paciente': element.nomPac,
        'Tipo Afiliacion': element.nombreTipoAfil,
        'Origen': element.origen || '',
        'Destino': element.destino || '',
        'Valor del Bono': this.formatCurrency ? this.formatCurrency(element.valor) : element.valor,
        'Fecha de Grabacion': element.fechaGrab ? element.fechaGrab : element.fecBono,
        'Fecha de legalizacion': element.fechaGrab ? element.fechaGrab : element.fecBono,
        'Numero Autorizacion': element.numAut || ''
      }
      newArray.push(item);
    });

    this.dataToTableDownload = newArray;
   
    
  }

  formatCurrency(value: number, currencySymbol: string = '$'): string {
    const formatter = new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2,
    });
    return formatter.format(value).replace('COP', currencySymbol);
  }

  clearTable(): void {
    if(this.dataToTable.length === 0){
      Swal.fire({
        title: 'Atencion',
        text: 'No hay datos para borrar',
        icon: 'warning'
      })
      return;
    }
    this.dataToTable = [];
  }
}
