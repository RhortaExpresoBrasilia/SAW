import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor{

constructor(private _auth: AuthService) { }
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  const token = localStorage.getItem('token'); 

  if (token && token.length) {
    req = req.clone({
      setHeaders: {
        'Content-type': 'application/json;charset=utf-8',
        'Accept': 'application/json', 
        'Authorization': `Bearer ${token}`,
      }
    });
  }

  return next.handle(req).pipe(
    catchError(error => {
     if (error.status === 403) {
        this._auth.logout();
      }
      return throwError(() => error);
    })
  );
}

}
