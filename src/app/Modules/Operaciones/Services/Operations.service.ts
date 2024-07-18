import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  constructor(private _http: HttpClient) { }

  getExcedentesPendientes(Request:any): Observable<any> {
    return this._http.post<any>(
      `${environment.urlV2}/excedente-anticipo/listar-unico-excedente`,Request
    )
  }

  getTodosExcedentesPendientes(empresa:any): Observable<any> {
    return this._http.get<any>(
      `${environment.urlV2}/excedente-anticipo/listar-todos-excedente`,{ params: { empresa }}
    )
  }

  acutalizarEstado(id:any,estado:string):Observable<any>{
    const requestBody = { id: id, estado: estado };
    return this._http.post<any>(
      `${environment.urlV2}/excedente-anticipo/actualizar-estado`,requestBody
    )
  }

  getConcepto():Observable<any>{
    return this._http.get<any>(
      `${environment.urlV2}/excedente-anticipo/obtener-concepto`
    )
  }
}
