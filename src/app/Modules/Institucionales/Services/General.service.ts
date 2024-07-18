import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, timeout } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { passengerModel } from '../../../models/user-data';
@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http: HttpClient) { }

  getAddressingsForBonnusses() {
    return this.http.post<any>(`${environment.urlV1}/Direccionamientos/`, ["1", "2"]);
  }

  searchByVoucherNumber(no_bono: string): Observable<any> {

    const requestBody = { 'no_bono': no_bono };
    return this.http.post<any>(
      `${environment.urlV1}/bonosLegalizados/buscarXBono`, requestBody
    ).pipe(
      timeout(180000),
      catchError(error => this.handleError(error))
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
    } else {
      // El backend devolvió un código de error
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Devuelve un observable con un mensaje de error legible
    return throwError('Something bad happened; please try again later.');
  }

  getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
  }

  getToken() {
    return localStorage.getItem('token');
  }

  updatePassenger(requestBody: passengerModel, numeroBono: string, usuario: string): Observable<passengerModel> {
    return this.http.post<any>(
      `${environment.urlV1}/cliente/identificacion`, requestBody, { params: { numeroBono, usuario } }
    )
  }

  findByIdentificationClient(identificacion: any, empresa: any): Observable<any> {
    const requestBody = {
      identificacion: identificacion,
      codEmp: empresa
    }

    return this.http.post<any>(
      `${environment.urlV1}/cliente/buscarXPasajero`, requestBody)
  }

  findAllDocumentsType(): Observable<any> {
    return this.http.get<any>(
      `${environment.urlV1}/cliente/tipos-documentos`
    )
  }

  updateBonus(requestBody: any): Observable<any> {
    return this.http.post<any>(
      `${environment.urlV1}/bonosLegalizados/actualizar-bono`, requestBody
    )
  }

  sendTemplate(templateHtml: string, idPaciente: string, empresa:string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${environment.urlV1}/bonosLegalizados/envio-correo`, { template: templateHtml, nidePac: idPaciente,empresa:empresa }, { headers });
  }

  searchListOfContractBonuses(request:any): Observable<any>{
    return this.http.post<any>(
      `${environment.urlV1}/bonosLegalizados/buscar-x-contrato`, request
    )
  }

  updateBonusssesNumAuto(request:any,username:any):Observable<any>{
    return this.http.post<any>(
      `${environment.urlV1}/bonosLegalizados/actualizar-numero-autorizacion`, request,{ params: { username }}
    )
  }

}
