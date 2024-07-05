import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private keycloakService: KeycloakService, private navbarService: NavbarService) { }

  ngOnInit(): void {
    this.navbarService.hide();
  }

  register(): void {
    this.keycloakService.register();
  }
}
