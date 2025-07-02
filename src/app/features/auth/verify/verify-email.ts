import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './verify-email.html',
  styleUrl: './verify-email.scss',
})
export class VerifyEmail implements OnInit {
  message = '';
  success = false;
  loading = true;

  constructor(private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');

    if (!token) {
      this.message = 'Token inválido o faltante.';
      this.success = false;
      this.loading = false;
      return;
    }

    this.authService.verifyEmail(token).subscribe({
      next: (res) => {
        this.message = res.message;
        this.success = true;
        this.loading = false;
      },
      error: (err) => {
        this.message = err.error.message || 'Error al verificar el correo.';
        this.success = false;
        this.loading = false;
      }
    });
  }
}
