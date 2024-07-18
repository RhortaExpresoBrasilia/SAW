import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Params001DetailComponent } from '../params001-detail/params001-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { UserData } from 'src/app/models/user-data';

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

@Component({
  selector: 'app-params001',
  templateUrl: './params001.component.html',
  styleUrls: ['./params001.component.css']
})
export class Params001Component implements AfterViewInit {


  printMessage() {
    alert('1');
  }

  printMessage2() {
    alert('2');
  }

  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit', 'actions'];
  actions = [
    { label: 'Editar', value: 'edit' },
    { label: 'Eliminar', value: 'delete' }
  ];

  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(public dialog: MatDialog) {
    const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));
    this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  performAction(action: string, row: any) {
    if (action === 'edit') {
      this.editRow(row);
    } else if (action === 'delete') {
      this.deleteRow(row);
    }
  }

  editRow(row: any) {
    
    this.openDialog(row);
  }

  deleteRow(row: any) {
    
  }

  openDialog(row: any): void {
    this.dialog.open(Params001DetailComponent, {
      width: '600px',
      data: row
    })
  }

  createParameter() {
    this.openDialog({});
  }
}

function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
  };
}
