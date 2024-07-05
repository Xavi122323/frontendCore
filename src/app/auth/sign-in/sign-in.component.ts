import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private keycloakService: KeycloakService, private navbarService: NavbarService) { }

  ngOnInit(): void {
    this.navbarService.hide();
  }

  login(): void {
    this.keycloakService.login();
  }
}
