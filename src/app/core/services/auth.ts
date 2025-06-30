import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterDto } from '../../models/user'

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private API_URL = 'http://localhost:3000'; 

  register(dto: RegisterDto): Observable<any> {
    return this.http.post(`${this.API_URL}/auth/register`, dto);
  }
}
