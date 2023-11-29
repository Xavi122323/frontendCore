import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListServidoresComponent } from './servidor/list-servidores/list-servidores.component';
import { CreateServidorComponent } from './servidor/create-servidor/create-servidor.component';
import { EditServidorComponent } from './servidor/edit-servidor/edit-servidor.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthenticatorService } from './services/authenticator.service';
import { ListUsersComponent } from './admin_role/list-users/list-users.component';
import { UpdateUserComponent } from './admin_role/update-user/update-user.component';

const routes: Routes = [
  {
    path:'', component:SignInComponent
  },
  {
    path:'register/user', component:RegisterComponent
  },
  {
    path:'list/server', component:ListServidoresComponent
  },
  {
    path:'create/server', component:CreateServidorComponent
  },
  {
    path:'edit/server/:serverID', component:EditServidorComponent
  },
  {
    path:'list/user', component:ListUsersComponent
  },
  {
    path:'edit/user/:userID', component:UpdateUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
