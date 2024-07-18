import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TableReportMipresService {

  constructor(private _http: HttpClient) { }

  getDataTableReportMipres(data: any): Observable<any> {
    return this._http.post<any>(
      `${environment.urlV1}/bonosLegalizados/tabla-bono`, data
    ).pipe(
      map((response: any) => this.exportDataTableReport(response.data))
    )
  }

  getAddressingsList(data:any):Observable<any>{
    return this._http.post<any>(
      `${environment.urlV1}/bonosLegalizados/buscar-listado-de-bonos`, data
    )
  }

  getProgramming(data:any):Observable<any>{
    return this._http.post<any>(
      `${environment.urlV1}/bonosLegalizados/programar-bonos`, data
    )
  }

  getDelivery(data:any):Observable<any>{
    return this._http.post<any>(
      `${environment.urlV1}/Delivery/entrega-bonos`, data
    )
  }

  getFacturacion(data:any):Observable<any>{
    return this._http.post<any>(
      `${environment.urlV1}/facturacion/facturar-x-prescripcion`, data
    )
  }

  getReporteEntrega(data:any):Observable<any>{
    return this._http.post<any>(
      `${environment.urlV1}/Delivery/reporte-entrega-bonos`, data
    )
  }

  // exportDataTableReport(listBonos: any) {
    
  //   const nuevoListado = listBonos.map((element: any) => ({
  //     '# Bono': element.numBono,
  //     'Prescripcion': element.noPrescripcion,
  //     '# Entrega': element.noEntregaPac,
  //     'Direccionamiento': element.direccionamiento ? element.direccionamiento.ID : '0',
  //     'Cliente credito': element.clienteCredito ? element.clienteCredito: '',
  //     'Valor': this.formatCurrency(element.valor),
  //     'Paciente': element.nomPac,
  //     'Nro factura': element.nfactura,
  //     'Nap': element.napPac,
  //     'Orden': element.noEntregaPac,
  //     'Fecha de entrega': element.fecBono.split('T')[0],
  //     'Programacion': element.programacion ? element.programacion.ID : 0 ,
  //     'Entrega': element.entrega ? element.entrega.ID :0,
  //     'ReporteEntrega': element.reporteEntrega ? element.reporteEntrega.id :0,
  //     'Facturacion': element.facturacion ? element.facturacion.ID :0,
  //     'empresa': element.cemp
  //   }));

    
    
  //   return nuevoListado;
  // }

  exportDataTableReport(listBonos: any) {
    const nuevoListado = listBonos.map((element: any) => ({
      '# Bono': element.numBono || '',
      'Prescripcion': element.noPrescripcion || '',
      '# Entrega': element.noEntregaPac || '',
      'Direccionamiento': element.direccionamiento ? element.direccionamiento.ID : '0',
      'Cliente credito': element.clienteCredito || '',
      'Valor': this.formatCurrency ? this.formatCurrency(element.valor) : element.valor,
      'Paciente': element.nomPac || '',
      'Nro factura': element.nfactura || '',
      'Nap': element.napPac || '',
      'Orden': element.noEntregaPac || '',
      'Fecha de entrega': element.fecBono ? element.fecBono.split('T')[0] : '',
      'Programacion': element.programacion ? element.programacion.ID : 0,
      'Entrega': element.entrega ? element.entrega.ID : 0,
      'ReporteEntrega': element.reporteEntrega ? element.reporteEntrega.id : 0,
      'Facturacion': element.facturacion ? element.facturacion.ID : 0,
      'empresa': element.cemp || ''
    }));
  
    return nuevoListado;
  }
  formatCurrency(value: number, currencySymbol: string = '$'): string {
    const formatter = new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'COP', 
      minimumFractionDigits: 2,
    });
    return formatter.format(value).replace('COP', currencySymbol);
  }

}
