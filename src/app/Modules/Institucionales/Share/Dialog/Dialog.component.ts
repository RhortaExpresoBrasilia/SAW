import { Component, Inject, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { GeneralService } from 'src/app/Modules/Institucionales/Services/General.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-Dialog',
  templateUrl: './Dialog.component.html',
  styleUrls: ['./Dialog.component.css']
})
export class DialogComponent implements OnInit {
  responseSubject = new Subject<any>();
  UpdateForm!: FormGroup;
  bono!: string;
  loading: boolean = false;
  constructor(public dialogRef: MatDialogRef<DialogComponent>, private _api: GeneralService, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) { }

  ngOnInit() {
    this.UpdateForm = this.fb.group({
      prescripcion: new FormControl(''),
      numEntrega: new FormControl(''),
    });

    this.addDataToInput(this.data);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.addDataToInput(this.data);
    }
  }

  addDataToInput(data: any) {
    this.UpdateForm.patchValue({
      prescripcion: data['Prescripcion'],
      numEntrega: data['# Entrega']
    });
    this.bono = data['# Bono'];
  }

  updateData() {
    const data = {
      numBono: this.bono,
      noPrescripcion: this.UpdateForm.value.prescripcion,
      noEntregaPac: this.UpdateForm.value.numEntrega,
    }
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
