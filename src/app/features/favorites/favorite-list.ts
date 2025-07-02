import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../core/services/auth';
import { MovieCardComponent } from '../movies/components/movie-card';
import { Movie } from '../../models/movie';
import { NavbarComponent } from '../navbar/navbar';
import { MovieService } from '../../core/services/movie';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, NavbarComponent],
  templateUrl: './favorite-list.html',
  styleUrl: './favorite-list.scss'
})
export class FavoriteListComponent implements OnInit {
  private movieService = inject(MovieService);
  private http = inject(HttpClient);
  private auth = inject(AuthService);

  favorites = signal<Movie[]>([]);
  loading = signal<boolean>(true);

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
  this.movieService.getFavorites().subscribe({
    next: (res: any[]) => {
      console.log('Favoritos desde el backend:', res);
      const mapped = res.map(fav => ({
        imdbID: fav.imdbID,
        Title: fav.title,
        Year: fav.year,
        Type: 'movie',
        Poster: fav.poster
      }));
      this.favorites.set(mapped);
      this.loading.set(false);
    },
    error: (err) => {
      console.error('Error al obtener favoritos', err);
      this.loading.set(false);
    }
  });
}


  removeFavorite(imdbID: string) {
    this.movieService.removeFavorite(imdbID).subscribe({
      next: () => {
        this.favorites.update(favs => favs.filter(f => f.imdbID !== imdbID));
      },
      error: (err) => console.error('Error al eliminar favorito', err)
    });
  }
}
