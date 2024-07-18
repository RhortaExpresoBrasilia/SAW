export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

export interface LoginModel {
  username: string;
  password: string;
}

export interface TableMipres {
  '# Bono': string;
  'Prescripcion': string;
  '# Entrega': string;
  'Cantidad': number;
  'Direccionamiento': string;
  'Cliente credito': string;
  'Valor': string;
  'Paciente': string;
  'Nro factura': string;
  'Nap': string;
  'Orden': string;
  'Fecha de entrega': string;
  'Programacion': string;
  'Entrega': string;
  'ReporteEntrega': string;
  'Facturacion': string;
}

export interface TableUpdateBonnus {
  'Numero de Bono': string;
  'Origen': string;
  'Destino': string;
  'Nombre del Paciente': string;
  'Valor': string;
}

export interface TableListBonos {
  'Numero de Bono': string;
  'Identificacion del paciente': string;
  'Nombre del Paciente': string;
  'Tipo Afiliacion': string;
  'Origen': string;
  'Destino': string;
  'Valor del Bono': string;
  'Fecha de Grabacion': string;
  'Fecha de legalizacion': string;
  'Numero Autorizacion': string;

}

export interface bonoModel {
  refVenta: any;
  usuarioWeb: string;
  codBonoGrupal: string;
  cemp: string;
  direccionamiento: {
    estado: string;
    estadoProgramado: string;
    facturable: string;
    fecBono: string;
    idCliente: string;
    napPac: string;
    nfactura: string;
    nidPac: string;
    noEntregaPac: string;
    noPrescripcion: string;
    nomCliente: string;
    nomPac: string;
    numAut: string;
    numBono: string;
    valor: string;
  }
  numBono: string;
  noPrescripcion: string;
  idCliente: string;
  nomCliente: string;
  nomPac: string;
  fecBono: string;
  noEntregaPac: string;
  estado: string;
  estadoProgramado: string;
  facturable: string;
  valor: string;
  numAut: string;
  nidPac: string;
  nfactura: string;
  napPac: string;
  contrato: {
    eps: string;
    numCont: string;
    tipoContrato: string;
  }
  nombreEps: string;
  codEmpBono: string;
}

export interface passengerModel {
  nom: string;
  nom1: string;
  nom2: string;
  ape1: string;
  ape2: string;
  tel: string;
  email: string;
  ide: string;
  celu: string;
  id: {
    c_emp: string;
    n_ide: string;
  }
}