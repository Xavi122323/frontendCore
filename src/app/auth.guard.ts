import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthenticatorService } from './services/authenticator.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard{

  constructor(private authService: AuthenticatorService, private router: Router){}
  
  canActivate(){
    if(this.authService.isLoggedIn()){
      return true;
    }else{
      this.router.navigate(['']);
      return false;
    }
  }
}