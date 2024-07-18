import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TableReportMipresService } from 'src/app/Modules/Institucionales/Services/tableReportMipres.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.css']
})
export class InputFileComponent implements OnInit {
  reader: FileReader | null = null;
  @Output() fileData: EventEmitter<any> = new EventEmitter<any>();
  @Output() enableButton: EventEmitter<any> = new EventEmitter<any>();

  loading: boolean = false;
  habilitar:any ={
    direccionamiento:true,
    programacion:true,
    entrega:true,
    reporteEntrega:true,
    facturacion:true,
  }
  constructor(private _api: TableReportMipresService) { }

  ngOnInit() {
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const allowedExtensions = ['.xlsx', '.xls']; // Extensiones permitidas

    if (file) {
      this.loading = true;
      const fileName: string = file.name;
      const fileExtension: string = fileName.substring(fileName.lastIndexOf('.'));

      if (allowedExtensions.includes(fileExtension.toLowerCase())) {


        this.reader = new FileReader();
        this.reader.onload = (e: any) => {
          const workbook: XLSX.WorkBook = XLSX.read(e.target.result, { type: 'binary' });
          const sheetName: string = workbook.SheetNames[0];
          const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];

          const range = worksheet['!ref'] || 'A1:A1';
          const decodedRange = XLSX.utils.decode_range(range);
          const data: any[] = [];

          for (let R = decodedRange.s.r; R <= decodedRange.e.r; ++R) {
            for (let C = decodedRange.s.c; C <= decodedRange.e.c; ++C) {
              const cellAddress = { c: C, r: R };
              const cellRef = XLSX.utils.encode_cell(cellAddress);
              const cell = worksheet[cellRef];
              if (cell) {
                data.push(cell.v.trim());
              }
            }
          }

          const flatData = data.flat();
          this.proccessBonos(flatData);

          this.reader!.onload = null;
        }

        this.reader.readAsBinaryString(file);
      } else {
        Swal.fire({
          title: "Error al seleccionar el archivo!",
          text: "Archivo inválido. Selecciona un archivo de Excel.",
          icon: "error"
        });
      }
    }
  }

  proccessBonos(bonos: string[]) {

    if (bonos.length) {

      const bonosString = JSON.stringify(bonos);
      localStorage.setItem('listadoBonos', bonosString);
     
      
      this._api.getDataTableReportMipres(bonos).subscribe(
        (response: any) => {
          this.validateNull(response)
          this.loading = true;

          this.loading = false;
        },
        (error: any) => {

        }
      );
    }
  }
  validateNull(bonos: any) {
    let contadorPrescripcionCeroOVacio = 0;
    let contadorEntregaCeroOVacio = 0;
    let contadorDireccionamiento = 0;
    let contadorEntrega = 0;

    let bonosTotal= 0;

    let bonosCumplenCondicion = new Set<string>();
    let bonosUnicosCumplenCondicion: string[];
    // Recorremos cada objeto del arreglo
    for (let objeto of bonos) {
      // Verificamos si la propiedad Prescripcion es 0 o vacía
      if (objeto.Prescripcion !== "0") {
        contadorPrescripcionCeroOVacio++;
        bonosCumplenCondicion.add(objeto["# Bono"]);
      }
      if(objeto.Prescripcion){
        bonosTotal++;
      }
      // Verificamos si la propiedad # Entrega es 0 o vacía
      if (objeto["# Entrega"] !== "0") {
        contadorEntregaCeroOVacio++;
        bonosCumplenCondicion.add(objeto["# Bono"]);
      }

      if (objeto.Direccionamiento !== "0") {
        contadorDireccionamiento++;
      }
      if (objeto.Entrega !== "0") {
        contadorEntrega++;
      }

      bonosUnicosCumplenCondicion = Array.from(bonosCumplenCondicion);

    }

    Swal.fire({
      title: '¿Estás seguro?',
      html: `
      <div style="font-size: 15px"><span>Bonos con prescripción: ${contadorPrescripcionCeroOVacio}</span></div>
      <div style="font-size: 15px"><span>Bonos con # entrega: ${contadorEntregaCeroOVacio}</span></div>
    `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Descargar excel',
      cancelButtonText: 'Continuar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.downloadExcel(bonosUnicosCumplenCondicion, 'bonos con prescripcion')
      } else {
        this.fileData.emit(bonos);
        
        if (bonosTotal === contadorPrescripcionCeroOVacio) {
          
          this.habilitar.direccionamiento = false;
          
        }if(bonosTotal === contadorDireccionamiento){
          this.habilitar.direccionamiento= false;
          this.habilitar.programacion = false;
        }if(bonosTotal === contadorEntrega){
          this.habilitar.direccionamiento= false;
          this.habilitar.programacion = false;
          this.habilitar.entrega = false;
          this.habilitar.reporteEntrega = false;
          this.habilitar.facturacion = false;
        }
        
        
        this.enableButton.emit(this.habilitar);
      }
    });
  }

  downloadExcel(bonos: string[], fileName: string) {

    const wb = XLSX.utils.book_new();
    const wsData = bonos.map(bono => [bono]);
    const ws = XLSX.utils.aoa_to_sheet(wsData);

    XLSX.utils.book_append_sheet(wb, ws, 'Bonos');

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    a.download = fileName + '.xlsx';
    a.click();

    window.URL.revokeObjectURL(url);
  }


}
