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
import { AuthGuard } from './auth.guard';
import { ListComponenteComponent } from './componente/list-componente/list-componente.component';
import { CreateComponenteComponent } from './componente/create-componente/create-componente.component';
import { UpdateComponenteComponent } from './componente/update-componente/update-componente.component';

const routes: Routes = [
  {path:'', component:SignInComponent},
  {path:'register/user', component:RegisterComponent},
  {path:'list/server', component:ListServidoresComponent, canActivate:[AuthGuard]},
  {path:'create/server', component:CreateServidorComponent, canActivate:[AuthGuard]},
  {path:'edit/server/:serverID', component:EditServidorComponent, canActivate:[AuthGuard]},
  {path:'list/user', component:ListUsersComponent, canActivate:[AuthGuard]},
  {path:'edit/user/:userID', component:UpdateUserComponent, canActivate:[AuthGuard]},
  {path:'list/componente', component:ListComponenteComponent, canActivate:[AuthGuard]},
  {path:'create/componente', component:CreateComponenteComponent, canActivate:[AuthGuard]},
  {path:'edit/componente/:componenteID', component:UpdateComponenteComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
