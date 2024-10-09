import { Component, OnInit, ViewChild } from '@angular/core';
import { TableMipres } from 'src/app/models/user-data';
import { ExperienciaAlClienteService } from '../../Services/ExperienciaAlCliente.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import * as XLSX from 'xlsx'; // Importa la biblioteca XLSX para leer archivos Excel
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-params007',
  templateUrl: './params007.component.html',
  styleUrls: ['./params007.component.css']
})
export class Params007Component implements OnInit {
  dataToTable: TableMipres[] = [];
  //@ViewChild(MatPaginator) paginator!: MatPaginator;
  //headers: string[] = ['# cliente', 'Nombre', 'Edad', 'Correo Electrónico'];
  headers: string[] = []; // Variable para almacenar los encabezados
  MyHeaders: string[] = ['Empresa', 'Agencia de Venta', '# Tiquete', 'Origen', 'Destino', 'Cliente', '$ Valor']; // Variable para almacenar los encabezados

  data: any[] = [];
  MyData: any[] = [];
  filteredData = this.MyData; // Inicialmente, no hay filtro aplicado
  buttonsDisabled: any = {
    direccionamiento: true,
    programacion: true,
    entrega: true,
    reporteEntrega: true,
    facturacion: true,
  }


  loading: boolean = false; // Variable para mostrar el estado de carga
  color: string = 'primary';
  displayedColumns: string[] = [
    'Empresa', 'Agencia de Venta', '# Tiquete', 'Origen', 'Destino', 'Cliente', '$ Valor'
  ];

  transformedData: any[] = [];

  keyMap: { [key: string]: string } = {
    "empresa": "Empresa",
    "mesViaje": "MesViaje",
    "fechaVenta": "FechaVenta",
    "canalCompra": "CanalCompra",
    "ageVenta": "Agencia de Venta",
    "usuario": "Usuario",
    "tiquete": "# Tiquete",
    "estado": "Estado",
    "cedula": "Cedula",
    "nombre": "Cliente",
    "celular": "Celular",
    "email": "Email",
    "edad": "Edad",
    "tipoCliente": "TipoCliente",
    "fechaViaje": "FechaViaje",
    "origen": "Origen",    
    "destino": "Destino",
    "ruta": "Ruta",
    "hora": "Hora",    
    "nivelServicio": "NivelServicio",
    "numbus": "NumBus",
    "afiliado": "Afiliado",
    "nomAfiliado": "NombreAfiliado",
    "tripulacionTitular": "TripulacionTitular",
    "nombretripulacionTitular": "NombretripulacionTitular",
    "tripulacionRelevo": "TripulacionRelevo",
    "nombretripulacionRelevo": "NombretripulacionRelevo",    
    "valor": "$ Valor"
  };

  constructor(private _api: ExperienciaAlClienteService) { }

  ngOnInit() { }


  // Método para limpiar los datos de la tabla
  clearData(): void {
    this.transformedData = [];
    location.reload();
  }
  // Método para simular un clic en el input de archivo
  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  // Método para manejar el cambio en el input de archivo
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.loading = true; // Mostrar el spinner de carga
      this.readExcelFile(file);
    }
  }

  readExcelFile(file: File) {
    console.log("Archivo cargado:", file.name); // Imprime el nombre del archivo que se ha cargado en la consola.

    const reader = new FileReader(); // Crea una nueva instancia de FileReader para leer el contenido del archivo.

    // Definición del evento onload para FileReader
    reader.onload = (e: any) => {
      console.log("Lectura del archivo completada"); // Imprime un mensaje en la consola cuando la lectura del archivo se ha completado.

      const binaryStr = e.target.result; // Obtiene el resultado de la lectura del archivo en formato binario.
      const workbook = XLSX.read(binaryStr, { type: 'binary' }); // Lee el contenido binario del archivo y lo convierte en un libro de trabajo de Excel usando la biblioteca XLSX.

      // Asume que solo hay una hoja en el archivo Excel
      const worksheet = workbook.Sheets[workbook.SheetNames[0]]; // Obtiene la primera hoja del libro de trabajo (suponiendo que solo hay una hoja).
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false }); // Convierte el contenido de la hoja en un arreglo de arreglos JSON. `header: 1` indica que la primera fila contiene los encabezados.

      console.log("Datos JSON obtenidos:", jsonData); // Imprime los datos JSON obtenidos de la hoja en la consola.

      // Convertir jsonData a any[][]
      const rows = jsonData as any[][]; // Asegura que jsonData sea tratado como un arreglo de arreglos (matriz) de tipo `any`.

      // Verificar si hay filas en los datos obtenidos
      if (rows.length > 0) {
        // Extraer los encabezados (primera fila)
        this.headers = rows[0] as string[]; // La primera fila se considera como encabezados y se asigna a `this.headers`.

        // Verificar que todas las filas tengan el número esperado de columnas
        const validRows = rows.slice(1).filter((row: any[]) => {
          const isValid = row.length === this.headers.length && row.every(cell => cell !== undefined && cell !== null && cell !== '');
          if (!isValid) {
            // Si alguna fila tiene datos vacíos o el número de columnas no coincide, muestra una alerta
            this.alerta("Alerta", "Se encontraron filas con datos incompletos. Estas filas se omitirán.", "warning");
            //alert('Se encontraron filas con datos incompletos. Estas filas se omitirán.');
          }
          return isValid; // Filtra las filas válidas
        });

        // Convertir las filas restantes en objetos con claves basadas en los encabezados
        this.data = validRows.map((row: any[]) => {
          const obj: any = {}; // Crea un nuevo objeto para cada fila

          this.headers.forEach((header, index) => { // Itera sobre cada encabezado
            let value = row[index]; // Obtiene el valor correspondiente a la columna actual

            obj[header] = value || ''; // Asigna el valor al encabezado correspondiente en el objeto. Si el valor es `undefined`, se asigna una cadena vacía
          });
          return obj;
        });

        console.log('Headers:', this.headers); // Imprime los encabezados en la consola
        console.log('Data:', this.data); // Imprime los datos procesados en la consola
        this.obtenerViajes()
      } else {
        console.log('No se encontraron datos en el archivo.'); // Imprime un mensaje si no se encontraron datos en el archivo
      }
    };

    // Manejo de errores durante la lectura del archivo
    reader.onerror = (error) => {
      console.error("Error al leer el archivo:", error); // Imprime un mensaje de error si ocurre un problema al leer el archivo
      this.loading = false; // Ocultar el spinner en caso de error
    };

    reader.readAsBinaryString(file); // Lee el contenido del archivo como una cadena binaria


  }

  // Método para formatear la fecha en formato DD/MM/YYYY
  formatDate(date: Date): string {
    console.log(date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11, así que sumamos 1
    const day = String(date.getDate()).padStart(2, '0'); // Aseguramos que el día tenga dos dígitos

    return `${year}-${month}-${day}`;
  }

  // Método para descargar los datos como un archivo Excel
  downloadExcel() {
    // Crea una hoja de cálculo
    //const ws = XLSX.utils.json_to_sheet(this.data, { header: this.headers });
    const ws = XLSX.utils.json_to_sheet(this.transformedData, { header: this.MyHeaders });

    // Crea un libro de trabajo y agrega la hoja
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Datos');

    // Genera un archivo Excel en formato binario
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

    // Función para convertir el binario en un blob y descargarlo
    function s2ab(s: string) {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i < s.length; i++) {
        view[i] = s.charCodeAt(i) & 0xFF;
      }
      return buf;
    }

    // Crear un Blob del archivo binario y descargarlo
    const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'datosViaje.xlsx';
    link.click();
  }

  alerta(titulo: string, texto: string, icon: SweetAlertIcon) {
    return Swal.fire({
      title: titulo,
      text: texto,
      icon: icon
    });
  }

  obtenerViajes() {
    this._api.getViajes(this.data).subscribe(
      (response) => {
        if (!response.error && response.data) {
          console.log('data: ', response.data[0].data);
          this.transformData(response.data[0].data);
        }
        this.loading = false; // Ocultar el spinner después de obtener datos
      }, (err) => {
        console.error('Error en la solicitud:', err);
        this.loading = false; // Ocultar el spinner en caso de error
      })
  }

  transformData(data: any[]) {
    console.log("data recibida ", data[0].data);
    
    // Aplanar el array exterior y mapear el contenido
    const flattenedData = data.flat().map(item => this.mapObjectKeys(item));
    this.transformedData = flattenedData;
    console.log(this.transformedData);
  }
  mapObjectKeys(obj: any): any {
    const result: any = {};
    // Añadir todas las claves definidas en keyMap al resultado
    for (const [oldKey, newKey] of Object.entries(this.keyMap)) {
      result[newKey] = obj[oldKey] !== undefined ? obj[oldKey] : null;
    }
    return result;
  }
}
