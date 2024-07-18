import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'saw';
  isLoading: boolean = false;

  constructor(private httpClient: HttpClient, private notifService: NotificationService) { }

  ngOnInit(): void {
    this.handleSpinner();
  }

  handleSpinner() {
    this.notifService.showSpinnerSubject$.subscribe(show => this.isLoading = show);
  }

  doRequest(): void {
    this.notifService.showSpinner(true);
    this.httpClient.get('https://httpbin.org/get')
      .pipe(
        finalize(() => {
          this.notifService.showSpinner(false);
        })
      )
      .subscribe({
        next: data => {
          
        },
        error: error => {
          
        }
      });
  }
}
