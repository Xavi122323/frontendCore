import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { ListServidoresComponent } from './servidor/list-servidores/list-servidores.component';
import { CreateServidorComponent } from './servidor/create-servidor/create-servidor.component';
import { EditServidorComponent } from './servidor/edit-servidor/edit-servidor.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { RegisterComponent } from './auth/register/register.component';
import { ListUsersComponent } from './admin_role/list-users/list-users.component';
import { UpdateUserComponent } from './admin_role/update-user/update-user.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListComponenteComponent } from './componente/list-componente/list-componente.component';
import { CreateComponenteComponent } from './componente/create-componente/create-componente.component';
import { UpdateComponenteComponent } from './componente/update-componente/update-componente.component';
import { ListDatabaseComponent } from './bd/list-database/list-database.component';
import { CreateDatabaseComponent } from './bd/create-database/create-database.component';
import { UpdateDatabaseComponent } from './bd/update-database/update-database.component';
import { ListMetricaComponent } from './metrica/list-metrica/list-metrica.component';
import { CreateMetricaComponent } from './metrica/create-metrica/create-metrica.component';
import { UpdateMetricaComponent } from './metrica/update-metrica/update-metrica.component';
import { UsoCPUComponent } from './consultas/uso-cpu/uso-cpu.component';
import { UsoMemoriaComponent } from './consultas/uso-memoria/uso-memoria.component';
import { TransaccionesBaseComponent } from './consultas/transacciones-base/transacciones-base.component';
import { ComparacionServidoresComponent } from './consultas/comparacion-servidores/comparacion-servidores.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializeKeycloak } from './keycloak.config';
import { AuthInterceptor } from './auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    ListServidoresComponent,
    CreateServidorComponent,
    EditServidorComponent,
    SignInComponent,
    RegisterComponent,
    ListUsersComponent,
    UpdateUserComponent,
    NavbarComponent,
    ListComponenteComponent,
    CreateComponenteComponent,
    UpdateComponenteComponent,
    ListDatabaseComponent,
    CreateDatabaseComponent,
    UpdateDatabaseComponent,
    ListMetricaComponent,
    CreateMetricaComponent,
    UpdateMetricaComponent,
    UsoCPUComponent,
    UsoMemoriaComponent,
    TransaccionesBaseComponent,
    ComparacionServidoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatPaginatorModule,
    KeycloakAngularModule
  ],
  providers: [
  {
    provide: APP_INITIALIZER,
    useFactory: initializeKeycloak,
    multi: true,
    deps: [KeycloakService]
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
