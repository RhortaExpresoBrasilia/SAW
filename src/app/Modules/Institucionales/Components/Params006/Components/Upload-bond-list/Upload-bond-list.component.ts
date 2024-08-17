import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-Upload-bond-list',
  templateUrl: './Upload-bond-list.component.html',
  styleUrls: ['./Upload-bond-list.component.css']
})
export class UploadBondListComponent implements OnInit {
  loading: boolean = false;
  reader: FileReader | null = null;

  @Output() headersChanged: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() dataChanged: EventEmitter<any[]> = new EventEmitter<any[]>();

  headers: string[] = [];
  data: any[] = [];

  constructor() { }

  ngOnInit() {
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const allowedExtensions = ['.xlsx', '.xls'];
    if (file) {
      const fileName: string = file.name;
      const fileExtension: string = fileName.substring(fileName.lastIndexOf('.'));
      if (allowedExtensions.includes(fileExtension.toLowerCase())) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const workbook: XLSX.WorkBook = XLSX.read(e.target.result, { type: 'binary' });
          const sheetName: string = workbook.SheetNames[0];
          const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
  
          // Leer la primera fila para obtener los nombres de las cabeceras
          const headers: string[] = [];
          const range = worksheet['!ref'] || 'A1:A1';
          const decodedRange = XLSX.utils.decode_range(range);
  
          // Leer las cabeceras
          for (let C = decodedRange.s.c; C <= decodedRange.e.c; ++C) {
            const cellAddress = { c: C, r: 0 }; // La primera fila es índice 0
            const cellRef = XLSX.utils.encode_cell(cellAddress);
            const cell = worksheet[cellRef];
            if (cell && cell.v) {
              headers.push(String(cell.v).trim());
            }
          }
  
          // Mapeo de los meses en español
          const monthNames = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  
          // Emitir las cabeceras al componente padre
          this.headers = headers;
          this.headersChanged.emit(this.headers);
  
          // Leer los datos
          const result: any[] = [];
          for (let R = decodedRange.s.r + 1; R <= decodedRange.e.r; ++R) {
            const row: any = {};
            for (let C = decodedRange.s.c; C <= decodedRange.e.c; ++C) {
              const cellAddress = { c: C, r: R };
              const cellRef = XLSX.utils.encode_cell(cellAddress);
              const cell = worksheet[cellRef];
              const header = headers[C];
              if (header) {
                if (header.toUpperCase() === 'FECHA VIAJE' && cell) {
                  let dateValue;
                  if (cell.t === 'n') {
                    // Convertir número serial de Excel a fecha
                    dateValue = XLSX.SSF.parse_date_code(cell.v);
                    // Formatear la fecha como 'dd-mmm-yyyy'
                    const formattedDate = `${('0' + dateValue.d).slice(-2)}-${monthNames[dateValue.m - 1]}-${dateValue.y}`;
                    row[header] = formattedDate;
                  } else {
                    // Si no es un número, intenta convertir el valor de la celda a una fecha
                    const date = new Date(cell.v);
                    if (!isNaN(date.getTime())) {
                      const formattedDate = `${('0' + date.getDate()).slice(-2)}-${monthNames[date.getMonth()]}-${date.getFullYear()}`;
                      row[header] = formattedDate;
                    } else {
                      row[header] = '';
                    }
                  }
                } else {
                  row[header] = cell ? String(cell.v).trim() : '';
                }
              }
            }
            if (Object.keys(row).length) {
              result.push(row);
            }
          }
  
          // Almacena los datos procesados
          this.data = result;
          console.log("Headers:", this.headers);
          console.log("Data:", this.data);
  
          // Emitir los datos procesados al componente padre
          this.dataChanged.emit(this.data);
        };
  
        reader.readAsBinaryString(file);
      }
    }
  }
  

  notifyHeadersChange() {
    this.headersChanged.emit(this.headers);
  }
}
