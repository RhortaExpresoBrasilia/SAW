import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/Modules/Institucionales/Services/General.service';
import { AuthService } from '../../../../../../services/auth.service';
@Component({
  selector: 'app-Search-bonnus-for-date',
  templateUrl: './Search-bonnus-for-date.component.html',
  styleUrls: ['./Search-bonnus-for-date.component.css'],
  providers: [DatePipe]
})
export class SearchBonnusForDateComponent implements OnInit {
  range: FormGroup;
  @Output() dataToTable = new EventEmitter<any>();
  loading: boolean = false;

  constructor(private router: Router,private _api: GeneralService, private datePipe: DatePipe, private _auth: AuthService) {
    this.range = new FormGroup({
      start: new FormControl<Date | null>(null, [Validators.required, this.startDateValidator]),
      end: new FormControl<Date | null>(null, [Validators.required, this.endDateValidator]),
      contract: new FormControl<string | null>(null, [Validators.required, this.contractValidator()])
    });
  }

  ngOnInit() {
  }
  startDateValidator(control: AbstractControl) {
    const startDate = control.value;
    if (!startDate || isNaN(Date.parse(startDate))) {
      return { matStartDateInvalid: true };
    }
    return null;
  }

  endDateValidator(control: AbstractControl) {
    const endDate = control.value;
    if (!endDate || isNaN(Date.parse(endDate))) {
      return { matEndDateInvalid: true };
    }
    return null;
  }

  contractValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const contract = control.value;
      const contractPattern = /^[a-zA-Z0-9-]+$/; // Ejemplo de patrón: alfanumérico con guiones

      if (!contract) {
        return { contractInvalid: 'Campo requerido' };
      }

      if (!contractPattern.test(contract)) {
        return { contractInvalid: 'Formato inválido' };
      }

      return null;
    };
  }

  // search() {

  //   this.loading = true;
  //   if (this.range.invalid) {
  //     this.range.markAllAsTouched();
  //     this.loading = false;
  //     return;
  //   }

  //   const data: any = {
  //     startDate: this.datePipe.transform(this.range.value.start, 'yyyy-MM-dd'),
  //     endDate: this.datePipe.transform(this.range.value.end, 'yyyy-MM-dd'),
  //     numContract: this.range.value.contract,
  //   }
  //   

  //   this._api.searchListOfContractBonuses(data).subscribe((response: any) => {
  //   if(response.error === false ){
  //     this.loading= false;
  //     this.dataToTable.emit(response.data);
  //   }
  //   });
  // }

  search() {
    this.loading = true;
    if (this.range.invalid) {
      this.range.markAllAsTouched();
      this.loading = false;
      return;
    }

    const data: any = {
      startDate: this.datePipe.transform(this.range.value.start, 'yyyy-MM-dd'),
      endDate: this.datePipe.transform(this.range.value.end, 'yyyy-MM-dd'),
      numContract: this.range.value.contract,
    }
  
    this._api.searchListOfContractBonuses(data).subscribe((response: any) => {
      if (response.error === false) {
        this.loading = false;
        this.dataToTable.emit(response.data);
      }
    },(err)=>{
      this._auth.logout();
      return;
    });
  }
}
