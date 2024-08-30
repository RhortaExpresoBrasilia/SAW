import { Component, OnInit } from '@angular/core';
import { TableMipres } from 'src/app/models/user-data';

@Component({
  selector: 'app-params007',
  templateUrl: './params007.component.html',
  styleUrls: ['./params007.component.css']
})
export class Params007Component implements OnInit {
    dataToTable: TableMipres[] = [];
    headers: string[] = ['# cliente', 'Nombre', 'Edad', 'Correo Electrónico'];
    data: any[] = [];
    buttonsDisabled: any = {
    direccionamiento: true,
    programacion: true,
    entrega: true,
    reporteEntrega: true,
    facturacion: true,
    }

    loading: boolean = false;
    color: string = 'primary';
    displayedColumns: string[] = [
      'Empresa', 'Agencia De venta', '# Tiquete', 'Abordaje', 'Destino', 'Cliente','Valor'      
    ];

  constructor() { }

  ngOnInit() {

    this.data = [
      { '# cliente': 1, 'Nombre': 'Juan Pérez', 'Edad': 28, 'Correo Electrónico': 'juan.perez@example.com' },
      { '# cliente': 2, 'Nombre': 'Ana López', 'Edad': 32, 'Correo Electrónico': 'ana.lopez@example.com' },
      { '# cliente': 3, 'Nombre': 'Pedro Gómez', 'Edad': 45, 'Correo Electrónico': 'pedro.gomez@example.com' },
      { '# cliente': 1, 'Nombre': 'Juan Pérez', 'Edad': 28, 'Correo Electrónico': 'juan.perez@example.com' },
      { '# cliente': 2, 'Nombre': 'Ana López', 'Edad': 32, 'Correo Electrónico': 'ana.lopez@example.com' },
      { '# cliente': 3, 'Nombre': 'Pedro Gómez', 'Edad': 45, 'Correo Electrónico': 'pedro.gomez@example.com' },
      { '# cliente': 1, 'Nombre': 'Juan Pérez', 'Edad': 28, 'Correo Electrónico': 'juan.perez@example.com' },
      { '# cliente': 2, 'Nombre': 'Ana López', 'Edad': 32, 'Correo Electrónico': 'ana.lopez@example.com' },
      { '# cliente': 3, 'Nombre': 'Pedro Gómez', 'Edad': 45, 'Correo Electrónico': 'pedro.gomez@example.com' } 
    ];
  }

}
