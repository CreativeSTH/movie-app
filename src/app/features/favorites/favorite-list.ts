import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../core/services/auth';
import { MovieCardComponent } from '../movies/components/movie-card';
import { Movie } from '../../models/movie';
import { NavbarComponent } from '../navbar/navbar';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, NavbarComponent],
  templateUrl: './favorite-list.html',
  styleUrl: './favorite-list.scss'
})
export class FavoriteListComponent implements OnInit {
  private http = inject(HttpClient);
  private auth = inject(AuthService);

  favorites = signal<Movie[]>([]);
  loading = signal<boolean>(true);

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    const token = this.auth.getToken();
    this.http.get<Movie[]>('/api/favorites', {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    }).subscribe({
      next: (res) => {
        this.favorites.set(res);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error al obtener favoritos', err);
        this.loading.set(false);
      }
    });
  }

  removeFavorite(imdbID: string) {
    const token = this.auth.getToken();
    this.http.delete(`/api/favorites/${imdbID}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    }).subscribe({
      next: () => {
        this.favorites.update(favs => favs.filter(f => f.imdbID !== imdbID));
      },
      error: (err) => console.error('Error al eliminar favorito', err)
    });
  }
}
