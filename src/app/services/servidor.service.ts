import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticatorService } from './authenticator.service';

@Injectable({
  providedIn: 'root'
})
export class ServidorService {

  //url:string = "http://127.0.0.1:3000";
  url:string = "https://corebackend.onrender.com";
  constructor(private http: HttpClient, private authService: AuthenticatorService) { }

  listServidores(){
    return this.http.get(this.url+'/api/v1/servidor');
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  addServidor(data: any){
    return this.http.post(this.url+'/api/v1/servidor', data, this.authService.getHttpOptions())
  }

  findServidor(id: any){
    return this.http.get(this.url+'/api/v1/servidor/'+id)
  }

  editServidor(data:any, id:any){
    return this.http.put(this.url+'/api/v1/servidor/'+id,  data, this.authService.getHttpOptions())
  }

  deleteServidor(id: any){
    return this.http.delete(this.url+'/api/v1/servidor/'+id, this.authService.getHttpOptions())
  }

  /** 
  login(data: any){
    return this.http.post(this.url+'/api/v1/users', {user: data}, this.httpOptions);
  }

  register(data: any){
    return this.http.post(this.url+'/api/v1/users', {user: data}, this.httpOptions)
  }
  */
}
