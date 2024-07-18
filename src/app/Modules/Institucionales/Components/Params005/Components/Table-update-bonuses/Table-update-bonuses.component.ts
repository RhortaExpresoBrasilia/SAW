import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableListBonos } from 'src/app/models/user-data';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-Table-update-bonuses',
  templateUrl: './Table-update-bonuses.component.html',
  styleUrls: ['./Table-update-bonuses.component.css']
})
export class TableUpdateBonusesComponent implements OnInit {

  @Input() dataToTable: TableListBonos[] = [];
  displayedColumns: string[] = ['Numero de Bono', 'Nombre del Paciente', 'Origen', 'Destino', 'Valor del Bono', 'Numero Autorizacion'];
  dataSource = new MatTableDataSource<TableListBonos>(this.dataToTable);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataToTable'] && changes['dataToTable'].currentValue) {
      this.chargeData(changes['dataToTable'].currentValue);
    }
  }

  ngOnInit(): void {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  chargeData(data: any) {
    this.dataSource.data = data;

  }

  clearTable(): void {
    if (this.dataSource.data.length === 0) {
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
