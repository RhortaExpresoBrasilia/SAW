import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private isLoggedInFlag: boolean = false;
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  };


  constructor(private http: HttpClient,private router: Router) { }

  login(credentials: { username: string, password: string },route:string) {
    this.isLoggedInFlag = true;
    return this.http.post<any>(`${environment.url}/${route}`, credentials);

  }
  
  loginOperaciones(credentials: { username: string, password: string },route:string) {
    this.isLoggedInFlag = true;
    return this.http.post<any>(`${environment.urlV3}/${route}`, credentials);

  }

  logout(): void {
    this.isLoggedInFlag = false;
    localStorage.removeItem('token');
    this.router.navigate(['/http401']);
  }

  isLoggedIn(): boolean {
     return !!localStorage.getItem('token');
  }

  getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
  }


  setLoggedIn(value: boolean): void {
    this.isLoggedInSubject.next(value);
  }
  
}
