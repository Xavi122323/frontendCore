import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticatorService } from './authenticator.service';

@Injectable({
  providedIn: 'root'
})
export class MetricaService {

  url:string = "http://127.0.0.1:3000";
  //url:string = "https://corebackend.onrender.com";

  constructor(private http: HttpClient, private authService: AuthenticatorService) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  /*listMetricas(): Observable<any> {
    return this.http.get(this.url+'/api/v1/metrica', this.authService.getHttpOptions());
  }*/

  listMetricas(filters?: any): Observable<any> {
    let params = new HttpParams();
    if (filters) {
      Object.keys(filters).forEach(key => {
        params = params.append(key, filters[key]);
      });
    }
    return this.http.get(this.url + '/api/v1/metrica', { params });
  }

  addMetrica(data: any): Observable<any>{
    return this.http.post(this.url+'/api/v1/metrica', data, this.authService.getHttpOptions())
  }

  findMetrica(id: any): Observable<any>{
    return this.http.get(this.url+'/api/v1/metrica/'+id)
  }

  editMetrica(data: any, id: any): Observable<any>{
    return this.http.put(this.url+'/api/v1/metrica/'+id, data, this.authService.getHttpOptions())
  }

  deleteMetrica(id: any){
    return this.http.delete(this.url+'/api/v1/metrica/'+id, this.authService.getHttpOptions())
  }
}
