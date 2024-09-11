import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ExperienciaAlClienteService {

  constructor(private http: HttpClient) { }

  getViajes(data: any): Observable<any> {
    return this.http.post<any>(`${environment.url}/api/v1/experiencia-cliente/`, data)
  }

  test() {
    return [
      {
        "Empresa": "EXPRESO BRASILIA",
        "Agencia de Venta": "BARRANQUILLA",
        "# Tiquete": "123456789",
        "Abordaje": "BARRANQUILLA",
        "Destino": "CARTAGENA",
        "Cliente": "WILSON TORRES ENSUNCHO",
        "$ Valor": "63.500"
      },
      {
        "Empresa": "EXPRESO BRASILIA",
        "Agencia de Venta": "BARRANQUILLA",
        "# Tiquete": "113456786",
        "Abordaje": "BARRANQUILLA",
        "Destino": "CARTAGENA",
        "Cliente": "SOFIA LEON VEGA",
        "$ Valor": "74.500"
      },
      {
        "Empresa": "EXPRESO BRASILIA",
        "Agencia de Venta": "CARTAGENA",
        "# Tiquete": "114356787",
        "Abordaje": "CARTAGENA",
        "Destino": "SANTA MARTA",
        "Cliente": "MONICA PINEDA ARAGON",
        "$ Valor": "88.500"
      }
    ]
  };

}
