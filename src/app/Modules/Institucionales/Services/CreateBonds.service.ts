import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CreateBondsService {

  constructor(private http: HttpClient) { }

  cargaMasivaBonos(data: any, user: any): Observable<any> {

    const requestBody = {
      entity: data,
      usuario: user
    };
    return this.http.post<any>(`${environment.urlV1}/bonosLegalizados/cargue-masivo`, requestBody);
  }
}
