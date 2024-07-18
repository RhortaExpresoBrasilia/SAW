import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GeneralService } from 'src/app/Modules/Institucionales/Services/General.service';
import { TableListBonos } from 'src/app/models/user-data';
import * as XLSX from 'xlsx';
import { ActivatedRoute } from '@angular/router';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  @Output() dataExtracted = new EventEmitter<TableListBonos[]>();
  isvisible: boolean = false;
  username:any;

  extractedData!: any[];
  constructor(private _api: GeneralService, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onFileSelected(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);

    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      const data = XLSX.utils.sheet_to_json(ws, { header: 1 }) as any[][];

      // Obtener datos de las columnas A y J, obviando la cabecera
      const extractedData = data.slice(1).map(row => ({
        numeroDeBono: row[0],
        numeroAutorizacion: row[9]
      }));

      const extractedData2 = data.slice(1).map(row => ({
        'Numero de Bono': row[0],
        'Identificacion del paciente': row[1],
        'Nombre del Paciente': row[2],
        'Tipo Afiliacion': row[3],
        'Origen': row[4],
        'Destino': row[5],
        'Valor del Bono': row[6],
        'Fecha de Grabacion': row[7],
        'Fecha de legalizacion': row[8],
        'Numero Autorizacion': row[9]
      }));


      if (extractedData) {
        this.isvisible = true;
        this.extractedData = extractedData;
      }

      this.dataExtracted.emit(extractedData2);
      // Procesa los datos según sea necesario
    };
    reader.readAsBinaryString(target.files[0]);
  }

  actualizarBonos() {
      if (this.validateDataToSend(this.extractedData)) {
        Swal.fire({
          title: "Error al enviar los datos del excel!",
          text: "Uno o más campos están vacíos o nulos. No se puede continuar.",
          icon: "error"
        });
        return; // Detiene la ejecución si hay campos vacíos o nulos
    }
    
    this.route.paramMap.subscribe(params => {
       this.username = params.get('username');
    });

    this._api.updateBonusssesNumAuto(this.extractedData,this.username).subscribe((response) => {
      if (response.error === false) {
        Swal.fire({
          title: "Listado actulizado con exito",
          text: response.message,
          icon: "success"
        });
      }else{
        Swal.fire({
          title: "Error al actualizar los listados!",
          text: response.message,
          icon: "error"
        });
      }
    }, (err) => {
      console.log(err);
      Swal.fire({
        title: "Bono no encontrado!",
        text: err,
        icon: "error"
      });
    })

  }

  validateDataToSend(data: any[]): boolean {
    let hasEmptyField = false;
  
    data.forEach((bono: any) => {
      if (typeof bono.numeroDeBono !== 'string' || !bono.numeroDeBono.trim()) {
        hasEmptyField = true;
      }
      if (typeof bono.numeroAutorizacion !== 'string' && typeof bono.numeroAutorizacion !== 'number') {
        hasEmptyField = true;
      } else if (typeof bono.numeroAutorizacion === 'string' && !bono.numeroAutorizacion.trim()) {
        hasEmptyField = true;
      }
    });
  
    return hasEmptyField;
  }

}
