import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({ selector: 'app-header', templateUrl: './header.component.html', styleUrls: ['./header.component.scss'] })
export class HeaderComponent {
  menuOpen = false;
  constructor(public auth: AuthService) {}
  toggleMenu(): void { this.menuOpen = !this.menuOpen; }
  logout(): void { this.auth.logout(); }
}
