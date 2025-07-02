import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { showToast } from '../../../utils/toast';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.html',
  styleUrl: './register.scss',
  imports: [CommonModule, FormsModule, RouterModule]
})
export class Register {
  private authService = inject(AuthService);
  private router = inject(Router);

  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  register() {
    if (this.password !== this.confirmPassword) {
       showToast('Las contraseñas no coinciden', 'error');
      return;
    }

    this.authService.register({
      name: this.name,
      email: this.email,
      password: this.password,
    }).subscribe({
      next: () => {
        showToast('Registro exitoso', 'success');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        showToast(err?.error?.message || 'Error al registrar', 'error');
      }
    });
  }
}
