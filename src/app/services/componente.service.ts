import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticatorService } from './authenticator.service';

@Injectable({
  providedIn: 'root'
})
export class ComponenteService {

  url:string = "http://127.0.0.1:3000";
  //url:string = "https://corebackend.onrender.com";

  constructor(private http: HttpClient, private authService: AuthenticatorService) { }

  /*listComponentes(){
    return this.http.get(this.url+'/api/v1/componente');
  }*/

  listComponentes(filters?: any): Observable<any> {
    let params = new HttpParams();
    if (filters) {
      Object.keys(filters).forEach(key => {
        params = params.append(key, filters[key]);
      });
    }
    return this.http.get(this.url + '/api/v1/componente', { params });
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  addComponente(data: any){
    return this.http.post(this.url+'/api/v1/componente', data, this.authService.getHttpOptions());
  }

  findComponente(id: any){
    return this.http.get(this.url+'/api/v1/componente/'+id);
  }

  editComponente(data:any, id:any){
    return this.http.put(this.url+'/api/v1/componente/'+id,  data, this.authService.getHttpOptions());
  }

  deleteComponente(id: any){
    return this.http.delete(this.url+'/api/v1/componente/'+id, this.authService.getHttpOptions());
  }
}
