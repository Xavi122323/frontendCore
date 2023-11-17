import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticatorService } from 'src/app/services/authenticator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private authenticatorService: AuthenticatorService, private router: Router){}

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

}
