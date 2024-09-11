import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-params008',
  templateUrl: './params008.component.html',
  styleUrls: ['./params008.component.css']
})
export class Params008Component implements OnInit {

  columnas: string[] = ['codigo', 'descripcion', 'precio', 'borrar'];

  datos: Articulo[] = [];
  dataSource:any;

  articuloselect: Articulo = new Articulo(0, "", 0);

  @ViewChild(MatTable) tabla1!: MatTable<Articulo>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  borrarFila(cod: number) {
    if (confirm("Realmente quiere borrarlo?")) {
      this.datos.splice(cod, 1);
      this.tabla1.renderRows();
    }
  }

  agregar() {
    this.datos.push(new Articulo(this.articuloselect.codigo, this.articuloselect.descripcion, this.articuloselect.precio));
    this.tabla1.renderRows();
    this.articuloselect = new Articulo(0, "", 0);
  }
  
  constructor() { }

  ngOnInit() {
    for (let x = 1; x <= 100; x++)
      this.datos.push(new Articulo(x, `artículo ${x}`, Math.trunc(Math.random() * 1000)));
    this.dataSource = new MatTableDataSource<Articulo>(this.datos);
    this.dataSource.paginator = this.paginator;
  }

  
}

export class Articulo {
  constructor(public codigo: number, public descripcion: string, public precio: number) {
  }
}


