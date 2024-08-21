import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreateBondsService } from 'src/app/Modules/Institucionales/Services/CreateBonds.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { keyMapping, keyMapping1 } from '../Models/KeyMappings';

@Component({
  selector: 'app-Table-bonds',
  templateUrl: './Table-bonds.component.html',
  styleUrls: ['./Table-bonds.component.css']
})
export class TableBondsComponent implements OnInit {
  [x: string]: any;

  @Input() headers!: string[]
  @Input() data: any[] = []
  @Input() itemsPerPage: number = 10;
  loading: boolean = false;
  currentPage: number = 1;
  paginatedData: any[] = [];
  //Math: any;

  constructor(private _api: CreateBondsService, private route: ActivatedRoute,private _auth: AuthService) { }


  ngOnInit() {
    this.updatePagination();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && changes['data'].currentValue) {
      this.updatePagination();
    }
  }

  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedData = this.data.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.updatePagination();
  }

  get pages(): number[] {
    const totalPages = Math.ceil(this.data.length / this.itemsPerPage);
    return Array(totalPages).fill(0).map((_, i) => i + 1);
  }

  onItemsPerPageChange(newItemsPerPage: number) {
    this.itemsPerPage = newItemsPerPage;
    this.currentPage = 1; // Resetear a la primera página al cambiar el número de elementos por página
    this.updatePagination();
  }

  proccessData() {
    if (this.data.length > 0) {
      this.loading = true;
      const updatedArray = this.renameKeysInArray(this.data, keyMapping);
      const credentials = {
        usuario: this.route.snapshot.params['username'],
        password: this.route.snapshot.params['password']
      }
      this._api.cargaMasivaBonos(updatedArray, credentials).subscribe((response) => {
        this.loading = true;
        if (response.error == false) {
          const updatedArray1 = this.renameKeysInArray(response.data, keyMapping1);
          this.data = updatedArray1;
          this.updatePagination();
          Swal.fire({
            title: 'Exito!',
            text: 'Bonos creados con exito !',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });

          this.loading = false;
        }
      }, (error) => {
        
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al cargar la información',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });

        this.loading = false;
        if(error === 401){
          this._auth.logout();
        }
        
      })
    } else {
      Swal.fire({
        title: 'Error',
        text: 'No hay datos para enviar!',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    }

  }


  renameKeysInArray(array: any[], mapping: { [key: string]: string }): any[] {
    return array.map(item => {
      const newItem: any = {};
      for (const key of Object.keys(item)) {
        const newKey = mapping[key] || key;
        newItem[newKey] = item[key];
      }
      return newItem;
    });
  }

  exportAsExcel(): void {
    if (this.data.length > 0) {

      // Reorganizar las columnas para que 'NUMERO BONO' esté al final
      const rearrangedData = this.data.map(item => {
        const { "NUMERO BONO": numeroBono, ...rest } = item;
        return { ...rest, "NUMERO BONO": numeroBono };
      });

      // Convertir los datos reorganizados en una hoja de cálculo
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(rearrangedData);

      // Asegurar que 'worksheet['!ref']' no sea undefined
      const ref = worksheet['!ref'] || 'A1:A1';
      const range = XLSX.utils.decode_range(ref);
      const headerRange = { s: { c: range.s.c, r: range.s.r }, e: { c: range.e.c, r: range.s.r } };

      // Definir el estilo para los encabezados
      const headerStyle: XLSX.CellObject = {
        t: 's',
        s: {
          font: { bold: true },
          fill: { fgColor: { rgb: "D3D3D3" } } // Color de fondo gris claro para los encabezados
        }
      };

      // Aplicar el estilo a todos los encabezados
      for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
        const cellAddress = XLSX.utils.encode_cell({ r: headerRange.s.r, c: C });
        if (!worksheet[cellAddress]) continue;
        worksheet[cellAddress] = { ...worksheet[cellAddress], ...headerStyle };
      }

      // Agregar la tabla con filtros en los encabezados
      worksheet['!autofilter'] = { ref: ref };

      // Crear el libro de Excel
      const workbook: XLSX.WorkBook = {
        Sheets: { 'data': worksheet },
        SheetNames: ['data']
      };

      // Generar el archivo Excel en formato binario
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

      // Crear un objeto Blob con el contenido del archivo Excel
      const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });

      // Generar y disparar la descarga del archivo
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(data);
      downloadLink.download = 'datos_exportados.xlsx';
      downloadLink.click();

    } else {
      Swal.fire({
        title: 'Error',
        text: 'No hay datos para exportar!',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    }

  }

}
