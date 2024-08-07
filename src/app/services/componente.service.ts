import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticatorService } from './authenticator.service';

@Injectable({
  providedIn: 'root'
})
export class ComponenteService {

  //url:string = "http://127.0.0.1:3000";
  url:string = "https://corebackend.onrender.com";

  constructor(private http: HttpClient, private authService: AuthenticatorService) { }

  listComponentes(filters?: any): Observable<any> {
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
    
    return this.http.get(this.url + '/api/v1/componente', { params });
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  addComponente(data: any){
    return this.http.post(this.url+'/api/v1/componente', data);
  }

  findComponente(id: any){
    return this.http.get(this.url+'/api/v1/componente/'+id);
  }

  editComponente(data:any, id:any){
    return this.http.put(this.url+'/api/v1/componente/'+id,  data);
  }

  deleteComponente(id: any){
    return this.http.delete(this.url+'/api/v1/componente/'+id);
  }
}
