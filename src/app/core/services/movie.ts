import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Movie } from '../../models/movie';
import { Observable } from 'rxjs';
import { AuthService } from './auth'; // Importa AuthService si usas token

@Injectable({ providedIn: 'root' })
export class MovieService {
  private API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private get headers() {
    const token = this.auth.getToken();
    return { headers: new HttpHeaders().set('Authorization', `Bearer ${token}`) };
  }

  getRecentMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.API_URL}/movies/year-movies`);
  }

  addToFavorites(imdbID: string): Observable<any> {
    return this.http.post(`${this.API_URL}/favorites`, { imdbID }, this.headers);
  }

  getFavorites(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.API_URL}/favorites`, this.headers);
  }

  removeFavorite(imdbID: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/favorites/${imdbID}`, this.headers);
  }
}
