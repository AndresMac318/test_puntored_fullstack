import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RechargeCreate } from '../interfaces/recharge.interface';
import { catchError, map, Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RechargeService {

  private api_url = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  getSuppliers(){
    return this.http.get<any>(`${this.api_url}/puntored/getSuppliers`).pipe(
      map(res => {
        if (res.length == 4) {
          return res;
        }
      }),
      catchError(error => {
        console.log('Error:', error);
        Swal.fire('Error', error.error.message, 'error');
        throw new Error('Ocurrio un error al obtener ls proveedores. Recarga la pagina!');
      })
    );
  }

  buyRecharge(body: RechargeCreate): Observable<any>{
    return this.http.post<any>(`${this.api_url}/recharge/create`, body).pipe(
      map(res => {
        if (res.transactionalID) {
          Swal.fire('Success', 'Recarga realizada !', 'success');
          return res;
        }
      }),
      catchError(error => {
        console.log('Error:', error);
        Swal.fire('Error', error.error.message, 'error');
        throw new Error('Ocurrio un error al realizar la recarga. Intenta nuevamente');
      })
    );
  }

  getMyRecharges(){
    return this.http.get<any[]>(`${this.api_url}/recharge/getMyRecharges`).pipe(
      map(res => {
        if (res[0].transactionalID) {
          return res;
        } else return [];
      }),
      catchError(error => {
        console.log('Error:', error);
        Swal.fire('Error', error.error.message, 'error');
        throw new Error('Ocurrio un error al recibir las recargas. Intenta nuevamente');
      })
    )
  }
}
