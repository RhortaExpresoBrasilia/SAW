import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-Spinner',
  templateUrl: './Spinner.component.html',
  styleUrls: ['./Spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  @Input() loading:boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
