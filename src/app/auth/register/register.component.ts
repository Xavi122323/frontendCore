import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticatorService } from 'src/app/services/authenticator.service';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  constructor(private authenticatorService: AuthenticatorService, private router: Router, private navbarService: NavbarService){}

  user: any;
  responseData: any;

  userForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  onSubmit(): void {
    this.authenticatorService.registerLogin(this.userForm.value.email, this.userForm.value.password)
      .subscribe(
        result =>{
          if(result != null){
            this.responseData = result;
            localStorage.setItem('token',this.responseData.jwtToken)
            this.router.navigate(['']);
          }
        }
      );
  }

  ngOnInit(): void {
    this.navbarService.hide();
}

}
