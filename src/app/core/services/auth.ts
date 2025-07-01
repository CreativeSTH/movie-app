import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  RegisterDto,
  LoginRequest,
  LoginResponse,
  User,
  JwtPayload
} from '../../models/user';
import { jwtDecode  } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:3000';

  // Registro de usuario
  register(dto: RegisterDto): Observable<any> {
    return this.http.post(`${this.API_URL}/auth/register`, dto);
  }

  // Verificación de correo electrónico
  verifyEmail(token: string): Observable<{ message: string }> {
    return this.http.get<{ message: string }>(
      `${this.API_URL}/auth/verify-email?token=${token}`
    );
  }

  // Login: devuelve token + datos del usuario
  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/auth/login`, data);
  }

  // ======= MÉTODOS PARA MANEJAR TOKEN =======

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  // ======= MÉTODOS PARA MANEJAR USUARIO =======

  setCurrentUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getCurrentUser(): User | null {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }

  removeCurrentUser(): void {
    localStorage.removeItem('user');
  }

  // ======= MÉTODOS ADICIONALES =======

  // Decodifica el JWT manualmente
  getUserFromToken(): JwtPayload | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode<JwtPayload>(token);
    } catch {
      return null;
    }
  }

  // Verifica si el token es válido (no expirado)
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const now = Math.floor(Date.now() / 1000);
      return decoded.exp > now;
    } catch {
      return false;
    }
  }

  // Logout completo
  logout(): void {
    this.removeToken();
    this.removeCurrentUser();
  }
}
