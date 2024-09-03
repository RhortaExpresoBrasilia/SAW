import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { OperationsService } from '../../Services/Operations.service';
import { LoginModalComponent } from '../Share/LoginModal/LoginModal.component';
@Component({
  selector: 'app-OperationsParam001',
  templateUrl: './OperationsParam001.component.html',
  styleUrls: ['./OperationsParam001.component.css']
})
export class OperationsParam001Component implements OnInit {

  concep: string = "VIAJE";
  concepOt: string = "FICHOS";
  isVisible: boolean = false;
  constructor(public dialog: MatDialog, private route: ActivatedRoute, private _api: OperationsService) { }
  data: any = [];
  dataLista: any[] = [];
  dataConceptos: any;
  conceptos: any[] = [];
  loading: boolean = false;
  autorizacion!: string;
  lista: boolean = false;

  ngOnInit() {
    this.validateRoute();
  }


  validateRoute() {
    this.loading = true;
    this.route.url.subscribe(segments => {
      const segmentArray = segments.map(segment => segment.path);
      if (segmentArray[0] === 'operationsParam001') {
        const validateParam = this.route.snapshot.paramMap.get('validate');

        if (validateParam === '1') {
          const token = localStorage.getItem("token");
          //this.openLoginModal()
          if (!token) {
            this.openLoginModal()
          } else {
            this.getExcedentes();
          }

        } else {
          this.getExcedentes();
        }
      } else {

      }
    });
  }

  openLoginModal(): void {
    const dialogRef = this.dialog.open(LoginModalComponent, {
      width: '600px',
      height: '300px',
    });

    dialogRef.afterClosed().subscribe(
      (result: any) => {
        this.getExcedentes();

      });
  }

  getExcedentes() {
    const empresa = this.route.snapshot.paramMap.get('empresa');
    const agencia = this.route.snapshot.paramMap.get('agencia');
    const autorizacion = this.route.snapshot.paramMap.get('autorizacion');

    const id: any = {
      codEmp: empresa,
      codAge: agencia,
      numAutorizacion: autorizacion
    }
    const requestBody = { id: id, estado: null };
    this._api.getExcedentesPendientes(requestBody).subscribe((response) => {
      

      if (response.error == false) {
        this.dataLista = response.data ? [response.data] : [];
        this.data = response.data;
        this.loading = false;
        this.isVisible = true;
      } else {
        this.loading = false;
        this.swalAlertConfirm('Error', `${response.message}`, 'error')

      }
    })
  }

  filtrarDatos(data: any, empresa: any, agencia: any, autorizacion: any) {

    const dataFiltrada = data.filter((item: any) =>
      item.id.codEmp === empresa &&
      item.id.codAge === agencia &&
      Number(item.id.numAutorizacion) === Number(autorizacion)
    );
    if (dataFiltrada.length === 0) {
      this.data = data;
    } else {
      this.data = dataFiltrada;
    }
  }

  aceptar(id: any, estado: string) {
    this.loading = true;
    this._api.acutalizarEstado(id, estado).subscribe((response) => {
      if (response.error == false) {
        this.loading = false
        this.swalAlertConfirm2('Exito', response.message, 'success')
        this.data = response.data;
        
      }
    })
  }

  denegar(id: any, estado: string) {
    this.loading = true;
    this._api.acutalizarEstado(id, estado).subscribe((response) => {
      if (response.error == false) {
        this.loading = false
        this.swalAlert('Exito', response.message, 'success')
        this.data = response.data;
      }
    })
  }

  getCategoriasGastos(item: any): { nombre: string, valor: number }[] {
    return [
      { nombre: 'ALCOHOLIMETRÍA', valor: item.vlrAlcohol },
      { nombre: 'PARQUEO', valor: item.vlrParqueo },
      { nombre: 'PEAJES', valor: item.vlrPeaje },
      { nombre: 'TASA OPERADOR', valor: item.vlrTasaOperador },
      { nombre: 'ALIMENTACIÓN', valor: item.vlrAlimentacion },
      { nombre: 'COMBUSTIBLE', valor: item.vlrCombustible },
      { nombre: 'TASA', valor: item.vlrTasa },
      { nombre: 'ALISTAMIENTO', valor: item.vlrAlistamiento },
      { nombre: 'ALOJAMIENTO', valor: item.vlrAlojamiento }
    ];
  }


  filtrar(autorizacion: string) {

    if (autorizacion !== "" && autorizacion !== null && autorizacion !== undefined) {

      this.loading = true;

      const numAutorizacion = Number(autorizacion); // Convertir a número
      this.dataLista = this.dataLista.filter(item => item.id.numAutorizacion === numAutorizacion);
      this.loading = false
    } else {
      this.swalAlert("Error", "Por favor ingresa un numero de autorizacion", 'error')
      this.getExcedentes()
    }
  }
  swalAlert(title: string, text: string, icon: SweetAlertIcon) {
    return Swal.fire({
      title: title,
      text: text,
      icon: icon
    });
  }

  swalAlertConfirm(title: string, text: string, icon: SweetAlertIcon) {
    Swal.fire({
      title: title,
      showDenyButton: true,
      showCancelButton: false,
      text: text,
      icon: icon,
      confirmButtonText: "Confirmar",
      denyButtonText: `Cancelar`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.getAllAnticipos();
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

  swalAlertConfirm2(title: string, text: string, icon: SweetAlertIcon) {
    Swal.fire({
      title: title,
      showDenyButton: true,
      showCancelButton: false,
      text: text,
      icon: icon,
      confirmButtonText: "Continuar"
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.getAllAnticipos();
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }
  getAllAnticipos() {
    this.loading = true;
    const empresa = this.route.snapshot.paramMap.get('empresa');
    this._api.getTodosExcedentesPendientes(empresa).subscribe((response) => {

      if (response.error == false) {

        console.log("Response de listado total",response.data);
        
        this.loading = false;
        this.dataLista = response.data
        this.isVisible=true;
      }
    })
  }
}
