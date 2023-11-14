import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticatorService } from 'src/app/services/authenticator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  constructor(private authenticatorService: AuthenticatorService, private router: Router)
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
            localStorage.setItem('token',this.responseData.jwtToken)
            this.router.navigate(['list/client']);
          }
        }
      );
  }

  registerRoute(){
    this.router.navigate(['register/user']);
  }

}
