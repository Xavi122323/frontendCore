import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListServidoresComponent } from './servidor/list-servidores/list-servidores.component';
import { CreateServidorComponent } from './servidor/create-servidor/create-servidor.component';
import { EditServidorComponent } from './servidor/edit-servidor/edit-servidor.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { RegisterComponent } from './auth/register/register.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
