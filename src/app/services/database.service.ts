import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthenticatorService } from './authenticator.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  //url:string = "http://127.0.0.1:3000";
  url:string = "https://corebackend.onrender.com";

  constructor(private http: HttpClient, private authService: AuthenticatorService) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }

  listDatabase(filters?: any): Observable<any> {
    let params = new HttpParams();
    if (filters) {
      Object.keys(filters).forEach(key => {
        params = params.append(key, filters[key]);
      });
    }

    if (filters.page) {
      params = params.append('page', filters.page.toString());
    }
    if (filters.limit) {
      params = params.append('limit', filters.limit.toString());
    }
    
    return this.http.get(this.url + '/api/v1/database', { params });
  }

  listUniqueDatabaseNames(servidorId?: number): Observable<{ nombre: string, server_id: number }[]> {
    let params = new HttpParams();
    params = params.set('unique_names', 'true');
  
    if (servidorId != null) {
      params = params.set('servidor_id', servidorId.toString());
    }
  
    return this.http.get<{ nombre: string, server_id: number }[]>(`${this.url}/api/v1/database`, { params })
      .pipe(
        catchError(error => {
          // Handle errors as appropriate
          return of([]);
        })
      );
  }

  addDatabase(data: any): Observable<any>{
    return this.http.post(this.url+'/api/v1/database', data, this.authService.getHttpOptions())
  }

  deleteDatabase(id: any): Observable<any>{
    return this.http.delete(this.url+'/api/v1/database/'+id, this.authService.getHttpOptions())
  }

  findDatabase(id: any): Observable<any>{
    return this.http.get(this.url+'/api/v1/database/'+id)
  }

  editDatabase(data: any, id: any): Observable<any>{
    return this.http.put(this.url+'/api/v1/database/'+id, data, this.authService.getHttpOptions())
  }
}
