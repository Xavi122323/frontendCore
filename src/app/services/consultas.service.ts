import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  constructor(private http: HttpClient) { }

  url:string = "http://127.0.0.1:3000";
  //url:string = "https://corebackend.onrender.com";


  getAverageCpuUsage(serverId: string, startDate: string, endDate: string): Observable<any> {
    const params = { server_id: serverId, start_date: startDate, end_date: endDate };
    return this.http.get(this.url+'/api/v1/uso_cpu_promedio', { params })
    .pipe(
      catchError((error) => {
        if (error.status === 404) {
          return throwError(() => new Error("No hay datos para las fechas ingresadas"));
        }
        else if(error.status === 400) {
          return throwError(() => new Error("Error parametros faltantes por ingresar"));
        } 
        else {
          return throwError(() => new Error("Error inesperado"));
        }
      })
    );
  }

  getCpuUsage(serverId: string, startDate: string, endDate: string): Observable<any> {
    const params = { server_id: serverId, start_date: startDate, end_date: endDate };
    return this.http.get(this.url+'/api/v1/cpu_fechas', { params })
    .pipe(
      catchError((error) => {
        if (error.status === 404) {
          return throwError(() => new Error("No hay datos para las fechas ingresadas"));
        }
        else if(error.status === 400) {
          return throwError(() => new Error("Error parametros faltantes por ingresar"));
        } 
        else {
          return throwError(() => new Error("Error inesperado"));
        }
      })
    );
  }

  getAverageMemoryUsage(serverId: string, startDate: string, endDate: string): Observable<any> {
    const params = { server_id: serverId, start_date: startDate, end_date: endDate };
    return this.http.get(this.url+'/api/v1/uso_memoria_promedio', { params })
    .pipe(
      catchError((error) => {
        if (error.status === 404) {
          return throwError(() => new Error("No hay datos para las fechas ingresadas"));
        }
        else if(error.status === 400) {
          return throwError(() => new Error("Error parametros faltantes por ingresar"));
        } 
        else {
          return throwError(() => new Error("Error inesperado"));
        }
      })
    );
  }

  getMemoryUsage(serverId: string, startDate: string, endDate: string): Observable<any> {
    const params = { server_id: serverId, start_date: startDate, end_date: endDate };
    return this.http.get(this.url+'/api/v1/memoria_fechas', { params })
    .pipe(
      catchError((error) => {
        if (error.status === 404) {
          return throwError(() => new Error("No hay datos para las fechas ingresadas"));
        }
        else if(error.status === 400) {
          return throwError(() => new Error("Error parametros faltantes por ingresar"));
        } 
        else {
          return throwError(() => new Error("Error inesperado"));
        }
      })
    );
  }

  getAverageTransactions(nombres?: string[], servidorId?: number, startDate?: string, endDate?: string): Observable<any> {
    let params = new HttpParams();
    if (nombres) {
      nombres.forEach(nombre => {
        params = params.append('nombres[]', nombre);
      });
    }
    if (servidorId) {
      params = params.append('servidor_id', servidorId.toString());
    }
    if (startDate) {
      params = params.append('start_date', startDate);
    }
    if (endDate) {
      params = params.append('end_date', endDate);
    }

    return this.http.get(this.url+'/api/v1/sumaTransacciones', { params })
    .pipe(
      catchError((error) => {
        if (error.status === 404) {
          return throwError(() => new Error("No hay datos para las fechas ingresadas"));
        }
        else if(error.status === 400) {
          return throwError(() => new Error("Error parametros faltantes por ingresar"));
        } 
        else {
          return throwError(() => new Error("Error inesperado"));
        }
      })
    );
  }

  getTransactionTotals(nombres?: string[], servidorId?: number, startDate?: string, endDate?: string): Observable<any> {
    let params = new HttpParams();
    if (nombres) {
      nombres.forEach(nombre => {
        params = params.append('nombres[]', nombre);
      });
    }
    if (servidorId) {
      params = params.append('servidor_id', servidorId.toString());
    }
    if (startDate) {
      params = params.append('start_date', startDate);
    }
    if (endDate) {
      params = params.append('end_date', endDate);
    }

    return this.http.get(this.url+'/api/v1/transaccionesTotales', { params })
    .pipe(
      catchError((error) => {
        if (error.status === 404) {
          return throwError(() => new Error("No hay datos para las fechas ingresadas"));
        }
        else if(error.status === 400) {
          return throwError(() => new Error("Error parametros faltantes por ingresar"));
        } 
        else {
          return throwError(() => new Error("Error inesperado"));
        }
      })
    );
  }

  compareServers(comparisonData: any): Observable<any> {
    return this.http.post(this.url+'/api/v1/compare', comparisonData).pipe(
      catchError((error) => {
        let errorMessage = "Unexpected error occurred";
        if (error.status === 404) {
          errorMessage = "No data available for the given criteria";
        } else if (error.status === 400) {
          errorMessage = "Missing required parameters";
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }

}
