import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-params001-detail',
  templateUrl: './params001-detail.component.html',
  styleUrls: ['./params001-detail.component.css']
})
export class Params001DetailComponent {

  constructor(public dialogRef: MatDialogRef<Params001DetailComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  close(): void {
    this.dialogRef.close();
  }
}
