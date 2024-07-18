import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { bonoModel, passengerModel } from 'src/app/models/user-data';
import { GeneralService } from 'src/app/Modules/Institucionales/Services/General.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { TemplateEmailComponent } from '../../Share/Template-email/Template-email.component';

@Component({
  selector: 'app-params004',
  templateUrl: './params004.component.html',
  styleUrls: ['./params004.component.css']
})
export class Params004Component implements OnInit {
  @ViewChild(TemplateEmailComponent, { static: false }) templateComponent!: TemplateEmailComponent;
  urlToSend: string = '';
  nombreCampos: any = {
    nom: 'Nombre Completo',
    nom1: 'Primer Nombre',
    nom2: 'Segundo Nombre',
    ape1: 'Primer Apellido',
    ape2: 'Segundo Apellido',
    tel: 'Teléfono',
    email: 'Correo Electrónico',
    ide: 'Identificación',
    celu: 'Celular',
    id: {
      c_emp: 'Empresa',
      n_ide: 'Número de Identificación'
    }
  };

  formData: any = {
    prescripcion: '',
    autorizacion: '',
    entrega: '',
    nap: '',
    identificacionPaciente: '',
    nombrePaciente: '',
    empresa: '',
    identificacionPasajero: '',
    nombrePasajero: '',

  };

  formDataPassenger = {
    newIdentificacionPasajero: '',
    tipoDoc: '',
    newNombrePasajero: '',
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    telefono: '',
    email: '',
    empresa: ''
  }

  selectedType = new FormControl('');
  bono!: string;
  loading: boolean = false;
  disableInput: boolean = true;
  visible: boolean = false;
  activeToogle: boolean = true;
  changeFunction: boolean = false;
  visibleButon: boolean = true;
  buttonSearch: boolean = true;
  documentsType: any;
  textButton: string = 'Buscar';
  colorButton: string = 'primary';
  textbuttonEdit: string = 'Editar pasajero';
  colorButtonEdit: string = 'warn';
  changeFunctionEdit: boolean = false;
  visibleButonSearch: boolean = false;
  visibleButonSave: boolean = false;
  valorSeleccionado: any;
  username!: string;
  webUser!: string;
  session!: any;
  eps!: string;
  numContrato!: string;
  empresa!: string;

  constructor(private routeActive: ActivatedRoute, private _api: GeneralService, private _auth: AuthService, private route: Router) {
    this.selectedType.valueChanges.subscribe(value => {
      this.valorSeleccionado = value;
    });
  }

  ngOnInit() {

  }

  onChargeInitial() {
    this._api.findAllDocumentsType().subscribe((res) => {
      console.log("data de los tipos: ", res.data);

      this.documentsType = res.data;
    }, (err) => {
      if (err.status === 403) {
        this._auth.logout();
      }
      this.loading = false;
    })
  }

  applyFilter(bono: any): void {

    if (this.changeFunction) {
      this.cleanForm();
    } else {
      if (bono != '') {
        this.loading = true;
        this._api.searchByVoucherNumber(bono).subscribe(
          (response: any) => {
            if (response.error == true) {
              Swal.fire({
                title: "Bono no encontrado!",
                text: response.message,
                icon: "error"
              });
              this.loading = false;
            } else {
              this.onChargeInitial();
              this.assingDataForm(response.data);
            }
          },
          (error: any) => {
            if (error.status === 403) {
              this._auth.logout();
            }
            this.loading = false;
          }
        );
      }
    }

  }

  onToggleChange() {
    this.visible = true;
    this.visibleButon = false;
    this.visibleButonSearch = true;
    this.visibleButonSave = false;

  }

  assingDataForm(data: bonoModel): void {

    if (data.contrato !== null) {
      if (data.contrato.eps === 'S' && data.estado === 'GR') {
        if (data.codBonoGrupal !== '' && data.codBonoGrupal !== null) {
          this.swalAlert("Error", `El bono ${data.numBono} pertenece a al grupo de bonos # ${data.codBonoGrupal}`, "error");
          this.visibleButon = false;
        }
      } else if (data.contrato.eps !== 'S') {
        this.visibleButon = false;
        this.swalAlert("Error", "El tipo de contrato no es eps", "error");
      } else if (data.estado !== 'GR') {
        this.visibleButon = false;
        this.swalAlert("Error", `El estado del bono ${data.numBono} es ${data.estado}`, "error");
      }
    } else {
      this.swalAlert("Error", `El bono ${data.numBono} no tiene contrato asignado`, "error");
      this.visibleButon = false;
    }

    this.loading = false;
    this.activeToogle = false;

    this.textButton = 'Limpiar';
    this.colorButton = 'warn';
    this.changeFunction = true;
    this.formData.prescripcion = data.noPrescripcion;
    this.formData.autorizacion = data.numAut;
    this.formData.entrega = data.noEntregaPac;
    this.formData.nap = data.napPac;
    this.formData.identificacionPaciente = data.nidPac;
    this.formData.nombrePaciente = data.nomPac;
    this.formData.identificacionPasajero = data.idCliente;
    this.formData.nombrePasajero = this.replaceNullWithEmpty(data.nomCliente);
    this.webUser = data.usuarioWeb;
    this.session = data.refVenta;
    this.eps = data.nombreEps;
    this.numContrato = data.contrato.numCont;
    this.urlToSend = `${environment.urlReport}&sesion=${data.refVenta}&usuario=${data.usuarioWeb}`
    this.empresa = data.codEmpBono;
  }

  cleanForm() {
    this.formData = {
      prescripcion: '',
      autorizacion: '',
      entrega: '',
      nap: '',
      identificacionPaciente: '',
      nombrePaciente: '',
    };

    this.formDataPassenger = {
      newIdentificacionPasajero: '',
      tipoDoc: '',
      newNombrePasajero: '',
      primerNombre: '',
      segundoNombre: '',
      primerApellido: '',
      segundoApellido: '',
      telefono: '',
      email: '',
      empresa: ''
    }
    this.bono = '';
    this.selectedType.setValue('');
    this.activeToogle = true;

    this.visible = false;

    this.textButton = 'Buscar';
    this.colorButton = 'primary';
    this.changeFunction = false;

    this.colorButtonEdit = 'warn';
    this.textbuttonEdit = 'Editar';
    this.visibleButon = true;

    this.visibleButonSearch = false;
    this.visibleButonSave = false;
    this.buttonSearch = true;
  }

  upgradePassenger(): void {

    const data: passengerModel = {
      id: {
        n_ide: this.formDataPassenger.newIdentificacionPasajero,
        c_emp: this.empresa
      },
      nom: `${this.formDataPassenger.primerNombre} ${this.formDataPassenger.segundoNombre} ${this.formDataPassenger.primerApellido} ${this.formDataPassenger.segundoApellido}`,
      nom1: this.formDataPassenger.primerNombre,
      nom2: this.formDataPassenger.segundoNombre,
      ape1: this.formDataPassenger.primerApellido,
      ape2: this.formDataPassenger.segundoApellido,
      tel: '000000000',
      celu: this.formDataPassenger.telefono,
      email: this.formDataPassenger.email,
      ide: this.valorSeleccionado,
    }

    //
    const campoVacio = this.validarCamposVacios(data);

    // Verificar el resultado y actuar en consecuencia
    if (campoVacio !== null) {

      Swal.fire({
        title: "Proceso truncado!",
        text: `El campo '${campoVacio}' está vacío.`,
        icon: "error"
      });
    } else {
      this.routeActive.params.subscribe(params => {
        this.username = params['username'];
      });

      this._api.updatePassenger(data, this.bono, this.username).subscribe(

        (response: any) => {

          if (response.error === false) {
            Swal.fire({
              title: "Proceso exitoso!",
              text: response.message,
              icon: "success"
            });
            this.sendHtmlTemplate();

          } else {
            Swal.fire({
              title: "Proceso truncado!",
              text: response.message,
              icon: "error"
            });
          }
        }, (err) => {
          if (err.status === 403) {
            this._auth.logout();
          }
          this.loading = false;
        });
    }
  }

  changeSearchInput(value: any) {
    if (value) {
      this.buttonSearch = false;
    }
  }

  searchPassanger(e: any) {
    this.loading = true;

    if (this.formDataPassenger.newIdentificacionPasajero === null || this.formDataPassenger.newIdentificacionPasajero === "") {
      Swal.fire({
        title: "Error",
        text: "Por favor ingresar un valor en el campo de identificacion",
        icon: "warning"
      });

      this.loading = false;
    } else {
      this._api.findByIdentificationClient(this.formDataPassenger.newIdentificacionPasajero, this.empresa).subscribe((response: any) => {

        if (response.error == false) {
          this.assignPassengerData(response.data)

        } else {
          this.loading = false;
          Swal.fire({
            title: "Atencion",
            text: response.message,
            icon: "warning"
          });
          this.visibleButonSearch = false;
          this.visibleButonSave = true;
        }

      }, (error) => {
        if (error.status != 200) {
          this._auth.logout();
        }
      })
    }
    // Tu lógica aquí si newIdentificacionPasajero está vacío}


  }

  assignPassengerData(data: any) {

    this.loading = false;
    this.visibleButonSearch = false;
    this.visibleButonSave = true;
    this.formDataPassenger.newNombrePasajero = data.nom;
    this.formDataPassenger.primerNombre = data.nom1;
    this.formDataPassenger.segundoNombre = data.nom2;
    this.formDataPassenger.primerApellido = data.ape1;
    this.formDataPassenger.segundoApellido = data.ape2;
    this.formDataPassenger.telefono = data.celu;
    this.formDataPassenger.email = data.email;
    this.formDataPassenger.empresa = data.cod_emp,
      this.selectedType.setValue(data.ide);

    this.visibleButonSearch = false;
    this.visibleButonSave = true;
  }

  cleanPassanger() {
    this.formDataPassenger.newNombrePasajero = '';
    this.formDataPassenger.primerNombre = '';
    this.formDataPassenger.segundoNombre = '';
    this.formDataPassenger.primerApellido = '';
    this.formDataPassenger.segundoApellido = '';
    this.formDataPassenger.telefono = '';
    this.formDataPassenger.tipoDoc = '';
    this.formDataPassenger.email = '';
    this.formDataPassenger.newIdentificacionPasajero = ''

    this.selectedType.setValue('');
    this.visibleButonSearch = true;
    this.visibleButonSave = false;
  }

  swalAlert(title: string, text: string, icon: SweetAlertIcon) {
    return Swal.fire({
      title: title,
      text: text,
      icon: icon
    });
  }

  sendHtmlTemplate() {
    const templateHtml = this.templateComponent.getTemplateHtml();


    this._api.sendTemplate(templateHtml, this.formData.identificacionPaciente, this.empresa).subscribe(response => {


      if (response.error === false) {
        this.swalAlert("Envio exitoso!", "Correo enviado correctamente", "success");
        this.cleanForm();
      } else {
        this.swalAlert("Envio erroneo!", "Error al enviar el correo de notificacion", "error");
      }
    }, error => {
      if (error.status != 200) {
        this.swalAlert("Error!", "Sesion inactiva", "error");
        this._auth.logout();
      }
    });
  }


  validarCamposVacios(passengerModel: passengerModel): string | null {
    if (!passengerModel.id || !passengerModel.id.n_ide || passengerModel.id.n_ide.trim() === '') {
      return this.traducirNombreCampo('id.n_ide');
    }

    if (!passengerModel.nom1 || passengerModel.nom1.trim() === '') {
      return this.traducirNombreCampo('nom1');
    }

    if (!passengerModel.ape1 || passengerModel.ape1.trim() === '') {
      return this.traducirNombreCampo('ape1');
    }

    if (!passengerModel.ide || passengerModel.ide.trim() === '') {
      return this.traducirNombreCampo('ide');
    }

    return null;
  }

  traducirNombreCampo(key: string): string {
    const nombreCampos: any = {
      nom: 'Nombre Completo',
      nom1: 'Primer Nombre',
      nom2: 'Segundo Nombre',
      ape1: 'Primer Apellido',
      ape2: 'Segundo Apellido',
      tel: 'Teléfono',
      email: 'Correo Electrónico',
      ide: 'Tipo de documento',
      celu: 'Celular',
      id: {
        c_emp: 'Empresa',
        n_ide: 'Número de Identificación'
      }
    };

    // Verificar si la clave tiene un punto (indicativo de un campo anidado)
    if (key.includes('.')) {
      const [firstLevel, secondLevel] = key.split('.');
      if (nombreCampos[firstLevel] && typeof nombreCampos[firstLevel] === 'object') {
        return nombreCampos[firstLevel][secondLevel] || key;
      }
    }

    // Si no es un campo anidado, buscar directamente en nombreCampos
    const nombreTraducido = nombreCampos[key];
    return nombreTraducido !== undefined ? nombreTraducido : key;
  }

  replaceNullWithEmpty(value: string): string {
    return value ? value.replace(/\bnull\b/g, '') : '';
  }
}
