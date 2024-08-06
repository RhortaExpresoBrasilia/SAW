import { Component, Inject, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { GeneralService } from 'src/app/Modules/Institucionales/Services/General.service';

@Component({
  selector: 'app-Dialog',
  templateUrl: './Dialog.component.html',
  styleUrls: ['./Dialog.component.css'],
  
})
export class DialogComponent implements OnInit {
  responseSubject = new Subject<any>();
  UpdateForm!: FormGroup;
  bono!: string;
  loading: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    private _api: GeneralService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) {

  }

  ngOnInit() {
    this.UpdateForm = this.fb.group({
      prescripcion: new FormControl(''),
      numEntrega: new FormControl(''),
      fechaEntrega: new FormControl<Date | null>(null)
    });

    this.addDataToInput(this.data);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.addDataToInput(this.data);
    }
  }

  addDataToInput(data: any) {
    console.log("Fecha de: ", data['Fecha de entrega']);

    this.UpdateForm.patchValue({
      prescripcion: data['Prescripcion'],
      numEntrega: data['# Entrega'],
      fechaEntrega: new Date(`${data['Fecha de entrega']}T00:00:00`)
    });
    this.bono = data['# Bono'];
  }

  updateData() {
    
    const data = {
      numBono: this.bono,
      noPrescripcion: this.UpdateForm.value.prescripcion,
      noEntregaPac: this.UpdateForm.value.numEntrega,
      fechaEntrega: this.UpdateForm.value.fechaEntrega
    }
    console.log(data);

    this.loading = true;
    this._api.updateBonus(data).subscribe((response) => {
      this.closeDialog()
      this.responseSubject.next(response);
      this.loading = false;
    }, (error) => {

    })


  }

  closeDialog() {
    this.UpdateForm.reset();
    this.data = null;
    this.dialogRef.close();
  }

}
