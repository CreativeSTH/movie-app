import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../../app/core/services/movie';
import { Movie } from '../../models/movie';
import { NavbarComponent } from '../navbar/navbar';
import { MovieCardComponent } from '../movies/components/movie-card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-search',
  standalone: true,
  imports: [CommonModule, NavbarComponent, MovieCardComponent, FormsModule],
  templateUrl: './movie-search.html',
})
export class MovieSearchComponent {
  private movieService = inject(MovieService);
  movies = signal<Movie[]>([]);
  loading = signal<boolean>(true);
  searchQuery = ''; // ✅ añadimos esto

  ngOnInit() {
    this.loadRecentMovies();
  }

  loadRecentMovies() {
    this.loading.set(true);
    this.movieService.getRecentMovies().subscribe({
      next: (res) => {
        this.movies.set(res);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error cargando películas:', err);
        this.loading.set(false);
      }
    });
  }

  search() {
    if (!this.searchQuery.trim()) return this.loadRecentMovies();
    this.loading.set(true);
    this.movieService.searchMovies(this.searchQuery).subscribe({
      next: (res) => {
        this.movies.set(res);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error en búsqueda:', err);
        this.loading.set(false);
      }
    });
  }

  addToFavorites(imdbID: string) {
    this.movieService.addToFavorites(imdbID).subscribe({
      next: () => alert('Agregada a favoritos'),
      error: () => alert('Error al agregar a favoritos')
    });
  }
}
