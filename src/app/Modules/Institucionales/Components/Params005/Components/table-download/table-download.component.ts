import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableListBonos } from 'src/app/models/user-data';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-table-download',
  templateUrl: './table-download.component.html',
  styleUrls: ['./table-download.component.css']
})
export class TableDownloadComponent implements OnInit {
  @Input() dataToTable: TableListBonos[] = [];
  displayedColumns: string[] = ['Numero de Bono', 'Nombre del Paciente',  'Origen', 'Destino', 'Valor del Bono'];
  dataSource = new MatTableDataSource<TableListBonos>(this.dataToTable);
  loading: boolean = false;
  visibleDown:boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor() { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.data = this.dataToTable;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataToTable'] && changes['dataToTable'].currentValue) {
      this.loading = true;
      this.chargeData(changes['dataToTable'].currentValue);
    }
  }

  chargeData(data:any){
    this.dataSource.data = data;
    this.loading= false;
    this.visibleDown = true;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  generateExcel(){
    if(this.dataSource.data.length === 0){
      Swal.fire({
        title: 'Atencion',
        text: 'No hay datos para exportar',
        icon: 'warning'
      })
      return;
    }
    const wsData = this.dataSource.data.map((bono) => [
      bono['Numero de Bono'],
      bono['Identificacion del paciente'],
      bono['Nombre del Paciente'],
      bono['Tipo Afiliacion'],
      bono['Origen'],
      bono['Destino'],
      bono['Valor del Bono'],
      bono['Fecha de Grabacion'],
      bono['Fecha de legalizacion'],
      bono['Numero Autorizacion']
    ]);

    // Agregar encabezados a wsData
    const headers = [
      'Numero de Bono',
      'Identificacion del paciente',
      'Nombre del Paciente',
      'Tipo Afiliacion',
      'Origen',
      'Destino',
      'Valor del Bono',
      'Fecha de Grabacion',
      'Fecha de legalizacion',
      'Numero Autorizacion'
    ];
    wsData.unshift(headers);

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // Calcular el ancho de las columnas
    const wscols = headers.map((header, index) => {
      const maxLength = Math.max(
        ...wsData.map(row => (row[index] ? row[index].toString().length : 0)),
        header.length
      );
      return { wch: maxLength + 2 }; // Agrega un poco de espacio adicional
    });
    ws['!cols'] = wscols;

    // Agregar autofiltro
    ws['!autofilter'] = { ref: `A1:${String.fromCharCode(64 + headers.length)}${wsData.length}` };

    // Aplicar estilo a la cabecera
    const headerStyle = {
      fill: {
        fgColor: { rgb: "FF0000FF" } // Azul
      },
      font: {
        color: { rgb: "FFFFFFFF" }, // Blanco
        bold: true
      }
    };

    headers.forEach((header, index) => {
      const cellAddress = XLSX.utils.encode_cell({ c: index, r: 0 });
      if (!ws[cellAddress]) ws[cellAddress] = { t: 's', v: header };
      ws[cellAddress].s = headerStyle;
    });

    XLSX.utils.book_append_sheet(wb, ws, 'Bonos');

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    a.download = 'bonos_data.xlsx';
    a.click();

    window.URL.revokeObjectURL(url);
  }

  clearTable(): void {
    if(this.dataSource.data.length === 0){
      Swal.fire({
        title: 'Atencion',
        text: 'No hay datos para borrar',
        icon: 'warning'
      })
      return;
    }
    this.dataSource.data = [];
  }

}
