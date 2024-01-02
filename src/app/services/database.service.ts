import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AuthenticatorService } from './authenticator.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  url:string = "http://127.0.0.1:3000";
  //url:string = "https://corebackend.onrender.com";

  constructor(private http: HttpClient, private authService: AuthenticatorService) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }

  /*listDatabase(): Observable<any>{
    return this.http.get(this.url+'/api/v1/database', this.authService.getHttpOptions())
  }*/

  listDatabase(filters?: any): Observable<any> {
    let params = new HttpParams();
    if (filters) {
      Object.keys(filters).forEach(key => {
        params = params.append(key, filters[key]);
      });
    }
    return this.http.get(this.url + '/api/v1/database', { params });
  }

  listUniqueDatabaseNames(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}/api/v1/database`, {
      params: new HttpParams().set('unique_names', 'true')
    });
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
