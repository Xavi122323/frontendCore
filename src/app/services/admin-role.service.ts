import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticatorService } from './authenticator.service';

@Injectable({
  providedIn: 'root'
})
export class AdminRoleService {

  url:string = "http://127.0.0.1:3000";
  //url:string = "https://corebackend.onrender.com"
  constructor(private http: HttpClient,private authService: AuthenticatorService) { }

  listUsers(){
    return this.http.get(this.url+'/api/v1/admin_role', this.authService.getHttpOptions());
  }

  findUser(id: any){
    return this.http.get(this.url+'/api/v1/admin_role/'+id);
  }

  editUser(data:any, id:any){
    return this.http.put(this.url+'/api/v1/admin_role/'+id,  data, this.authService.getHttpOptions())
  }

  deleteUser(id: any){
    return this.http.delete(this.url+'/api/v1/admin_role/'+id, this.authService.getHttpOptions())
  }
}
