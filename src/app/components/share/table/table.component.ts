import { AfterViewInit, Component, Input, SimpleChange, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TableListBonos, TableMipres, TableUpdateBonnus } from 'src/app/models/user-data';
import { TableReportMipresService } from 'src/app/Modules/Institucionales/Services/tableReportMipres.service';
import Swal from 'sweetalert2';
import { DialogComponent } from '../../../Modules/Institucionales/Share/Dialog/Dialog.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})


export class TableComponent implements AfterViewInit {

  @Input() dataToTable!: TableMipres[] | TableUpdateBonnus[] | TableListBonos[];
  @Input() displayedColumns!: string[];
  loading: boolean = true;
  editando = false;
  valorOriginal: any;

  dataSource!: MatTableDataSource<TableMipres>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private dialog: MatDialog, private _apiTable: TableReportMipresService) {
  }

  ngOnInit() {
    this.addColumnToDisplayedColumns();
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    if (changes['dataToTable']) {
      this.addColumnToDisplayedColumns();
      this.chargeDataToTable()
      this.getTableWidth()
    }
  }

  ngAfterViewInit() {

  }

  getTableWidth(): string {
    const columnWidth = 150; // Ancho predeterminado de cada columna
    return (this.displayedColumns.length * columnWidth) + 'px';
  }
  logData(fila: any) {
    const dialogRef = this.dialog.open(DialogComponent,
      {
        width: '600px',
        data: fila
      })

    dialogRef.componentInstance.responseSubject.subscribe((response) => {

      if (response.error == false) {
        Swal.fire({
          title: "Actualizado exitoso",
          text: response.message,
          icon: "success"
        })
        const bonosString = localStorage.getItem('listadoBonos');
        const listadoDeBonos = JSON.parse(bonosString!);
        this.getDataToTable(listadoDeBonos)
      }
    });
  }

  getDataToTable(data: any) {
    this.loading = true;
    this._apiTable.getDataTableReportMipres(data).subscribe((response) => {
      this.dataToTable = response;
      this.chargeDataToTable();
      this.loading = false;
    });
  }

  chargeDataToTable() {
    this.loading = true;

    this.dataSource = new MatTableDataSource<any>(this.dataToTable);
    this.dataSource.paginator = this.paginator;
    this.loading = false;
  }

  addColumnToDisplayedColumns() {
    if (!this.displayedColumns.includes('accion')) {
      this.displayedColumns.unshift('accion');
    }
  }

  deleteRow(row: any) {
    // Mostrar el SweetAlert2 de confirmación
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.updateBonusList(row['# Bono'])
        const index = this.dataSource.data.indexOf(row);
        if (index > -1) {
          this.dataSource.data.splice(index, 1);
          this.dataSource = new MatTableDataSource<any>(this.dataSource.data);
        }
      }
    });
  }

  updateBonusList(bonus: any) {
    const bonosString = localStorage.getItem('listadoBonos');
    if (bonosString) {
      const bonos = JSON.parse(bonosString);
      const index = bonos.findIndex((bono: any) => bono === bonus);
      if (index > -1) {
        bonos.splice(index, 1);
        localStorage.setItem('listadoBonos', JSON.stringify(bonos));
        this.getDataToTable(bonos);
      }
    }

  }

  clearTable(): void {
    if (this.dataToTable.length === 0) {
      Swal.fire({
        title: 'Atencion',
        text: 'No hay datos para borrar',
        icon: 'warning'
      })
      return;
    }
    

    this.dataSource.data = [];
    window.location.reload()
  }
}
