import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {

  url:string = "http://127.0.0.1:3000";
  constructor(private http: HttpClient) { }

  proceedLogin(email: any, password: any){
    const body = {
      user: {
        email: email,
        password: password,
      },
    };
    return this.http.post(this.url+'/api/v1/sign_in', body)
  }

  registerLogin(email: any, password: any){
    const body = {
      user: {
        email: email,
        password: password,
      },
    };
    return this.http.post(this.url+'/api/v1/sign_up', body)
  }

  isLoggedIn(){
    return localStorage.getItem('token')!=null;
  }

  getHttpOptions() {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return httpOptions;
  }
}