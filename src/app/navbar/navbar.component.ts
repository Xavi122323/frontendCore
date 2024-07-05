import { Component, OnDestroy } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { Subscription } from 'rxjs';
import { AuthenticatorService } from '../services/authenticator.service'; // Importa el servicio de autenticación

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnDestroy {
  showNavbar: boolean = true;
  subscription: Subscription;

  constructor(private navbarService: NavbarService, private authenticatorService: AuthenticatorService) { // Inyecta el servicio de autenticación
    this.subscription = this.navbarService.showNavbar.subscribe((value) => {
      this.showNavbar = value;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // Método para manejar el cierre de sesión
  logout(): void {
    this.authenticatorService.logout();
  }
}
