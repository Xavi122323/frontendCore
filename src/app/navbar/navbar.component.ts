import { Component, OnDestroy } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnDestroy {
  showNavbar: boolean = true;
  subscription: Subscription;

  constructor(private navbarService: NavbarService) {
    this.subscription = this.navbarService.showNavbar.subscribe((value) => {
      this.showNavbar = value;
    })
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
