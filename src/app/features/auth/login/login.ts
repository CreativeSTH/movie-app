import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth';
import { showToast } from '../../../utils/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
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
          showToast('Bienvenido', 'success');
          this.router.navigate(['/movies'], { replaceUrl: true });
        } else {
          this.errorMessage = 'Token no recibido.';
        }
      },
      error: (err) => {
        const msg = err.error?.message || 'Error al iniciar sesión';
        showToast(msg, 'error');
      },
    });
  }
}
