import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Params006',
  templateUrl: './Params006.component.html',
  styleUrls: ['./Params006.component.css']
})
export class Params006Component implements OnInit {
  myData:any[] = [];

  headers: string[] = [];
  constructor() { }

  ngOnInit() {
  }

  onHeadersChanged(newHeaders: string[]) {
    this.headers = newHeaders;
  }

  onDataChanged(newData:any[]){
    this.myData = newData;
  }

}
