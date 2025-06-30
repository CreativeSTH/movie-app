import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterDto } from '../../models/user'

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private API_URL = 'http://localhost:3000'; 

  verifyEmail(token: string): Observable<{ message: string }> {
    return this.http.get<{ message: string }>(`${this.API_URL}/auth/verify-email?token=${token}`);
  }
  register(dto: RegisterDto): Observable<any> {
    return this.http.post(`${this.API_URL}/auth/register`, dto);
  }
}
