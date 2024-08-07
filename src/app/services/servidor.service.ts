import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticatorService } from './authenticator.service';

@Injectable({
  providedIn: 'root'
})
export class ServidorService {

  //url:string = "http://127.0.0.1:3000";
  url:string = "https://corebackend.onrender.com";
  constructor(private http: HttpClient, private authService: AuthenticatorService) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  /*listServidores(){
    return this.http.get(this.url+'/api/v1/servidor');
  }*/

  listServidores(filters?: any): Observable<any> {
    let params = new HttpParams();
    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined) {
          params = params.append(key, filters[key]);
        }
      });
    }
    return this.http.get(this.url + '/api/v1/servidor', { params });
  }

  addServidor(data: any){
    return this.http.post(this.url+'/api/v1/servidor', data)
  }

  findServidor(id: any){
    return this.http.get(this.url+'/api/v1/servidor/'+id)
  }

  editServidor(data:any, id:any){
    return this.http.put(this.url+'/api/v1/servidor/'+id,  data)
  }

  deleteServidor(id: any){
    return this.http.delete(this.url+'/api/v1/servidor/'+id)
  }

}
