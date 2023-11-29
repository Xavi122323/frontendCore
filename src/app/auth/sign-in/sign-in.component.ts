import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticatorService } from 'src/app/services/authenticator.service';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy{

  constructor(private authenticatorService: AuthenticatorService, private router: Router, private navbarService: NavbarService)
  {
    localStorage.clear();
  }

  user: any;
  responseData: any;

  userForm = new FormGroup({
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  })

  onSubmit(): void {
    this.authenticatorService.proceedLogin(this.userForm.value.email, this.userForm.value.password)
      .subscribe(
        result =>{
          if(result != null){
            this.responseData = result;
            localStorage.setItem('token',this.responseData)
            this.router.navigate(['list/server']);
          }
        }
      );
  }

  registerRoute(){
    this.router.navigate(['register/user']);
  }

  ngOnInit(): void {
      this.navbarService.hide();
      localStorage.removeItem('token');
  }

  ngOnDestroy(): void {
      this.navbarService.display();
  }

}
