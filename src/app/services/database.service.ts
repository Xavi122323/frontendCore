import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticatorService } from './authenticator.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  url:string = "http://127.0.0.1:3000";

  constructor(private http: HttpClient, private authService: AuthenticatorService) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }

  listDatabase(): Observable<any>{
    return this.http.get(this.url+'/api/v1/database', this.authService.getHttpOptions())
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
