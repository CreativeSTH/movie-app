import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
})
export class Login {
  form = {
    email: '',
    password: '',
  };

  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.errorMessage = '';
    console.log('Login enviado:', this.form);

    this.authService.login(this.form).subscribe({
      next: (res) => {
        console.log('Respuesta del backend:', res);
        
        if (res.accessToken) {
          localStorage.setItem('token', res.accessToken);
          localStorage.setItem('user', JSON.stringify(res.user));
          this.router.navigate(['/movies'], { replaceUrl: true });
        } else {
          this.errorMessage = 'Token no recibido.';
        }
      },
      error: (err) => {
        console.error('Error en login:', err);
        this.errorMessage = err?.error?.message || 'Error en el servidor.';
      },
    });
  }
}
