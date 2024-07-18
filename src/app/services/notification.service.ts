import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  showSpinnerSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  showSpinner(show: boolean) {
    this.showSpinnerSubject$.next(show);
  }
}
