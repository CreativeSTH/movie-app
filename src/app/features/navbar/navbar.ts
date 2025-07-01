import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { User } from '../../models/user';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent {
  menuOpen = signal(false);
  user = signal<User | null>(null); // Nuevo signal

  constructor(
    public auth: AuthService,
    private router: Router
  ) {
    this.user.set(this.auth.getCurrentUser()); // Inicializamos con el user actual
  }

  toggleMenu() {
    this.menuOpen.update(open => !open);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
