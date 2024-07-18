import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralService } from '../Modules/Institucionales/Services/General.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor{

constructor(private _api: GeneralService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token'); 
    if (token && token.length) {
      req=req.clone({
        setHeaders:{
          'Content-type': 'application/json;charset=utf-8',
          'Accept':'application/json', 
          'Authorization': `Bearer ${token}`,
        }
      })
    }

    return next.handle(req);
  }

  
}
