import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../../models/movie';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getRecentMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.API_URL}/movies/year-movies`);
  }

  addToFavorites(imdbID: string): Observable<any> {
    return this.http.post(`${this.API_URL}/favorites`, { imdbID });
  }
}