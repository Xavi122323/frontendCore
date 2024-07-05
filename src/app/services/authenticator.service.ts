import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {

  private baseUrl: string = 'https://corebackend.onrender.com';

  constructor(private http: HttpClient, private keycloakService: KeycloakService) { }

  isLoggedIn(): boolean {
    return this.keycloakService.isLoggedIn();
  }

  getToken(): Promise<string> {
    return this.keycloakService.getToken();
  }

  getProtectedData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/v1/protected`);
  }

  logout(): void {
    this.keycloakService.logout();
  }
}
