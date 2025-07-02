import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/services/auth';
import { MovieCardComponent } from '../movies/components/movie-card';
import { Movie } from '../../models/movie';
import { NavbarComponent } from '../navbar/navbar';
import { MovieService } from '../../core/services/movie';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { showToast } from '../../utils/toast';

type FavoriteMovie = Movie & { rating?: number; comment?: string };

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, NavbarComponent, FormsModule],
  templateUrl: './favorite-list.html',
  styleUrl: './favorite-list.scss'
})
export class FavoriteListComponent implements OnInit {
  private movieService = inject(MovieService);
  private http = inject(HttpClient);
  private auth = inject(AuthService);

  favorites = signal<FavoriteMovie[]>([]);
  loading = signal<boolean>(true);

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    this.movieService.getFavorites().subscribe({
      next: (res: any[]) => {
        const mapped: FavoriteMovie[] = res.map(fav => ({
          imdbID: fav.imdbID,
          Title: fav.title,
          Year: fav.year,
          Type: 'movie',
          Poster: fav.poster,
          rating: fav.rating,
          comment: fav.comment
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
        showToast('Favorito eliminado', 'success');
      },
      error: (err) => console.error('Error al eliminar favorito', err)
    });
  }

  openRatingModal(movie: FavoriteMovie) {
    Swal.fire({
      title: `Calificar "${movie.Title}"`,
      html: `
        <input type="number" id="rating" class="swal2-input" placeholder="Calificación (1–10)" min="1" max="10" value="${movie.rating || ''}">
        <textarea id="comment" class="swal2-textarea" placeholder="Comentario (opcional)">${movie.comment || ''}</textarea>
      `,
      confirmButtonText: 'Guardar',
      showCancelButton: true,
      focusConfirm: false,
      preConfirm: () => {
        const rating = (document.getElementById('rating') as HTMLInputElement).value;
        const comment = (document.getElementById('comment') as HTMLTextAreaElement).value;
        if (!rating || +rating < 1 || +rating > 10) {
          Swal.showValidationMessage('La calificación debe estar entre 1 y 10');
          return null;
        }
        return { rating: +rating, comment };
      }
    }).then(result => {
      if (result.isConfirmed && result.value) {
        this.submitRating(movie.imdbID, result.value.rating, result.value.comment);
      }
    });
  }

  submitRating(imdbID: string, rating: number, comment: string) {
    this.movieService.rateFavorite(imdbID, rating, comment).subscribe({
      next: () => {
        this.loadFavorites();
        Swal.fire('¡Guardado!', 'Tu calificación ha sido registrada.', 'success');
      },
      error: (err) => {
        console.error('Error al guardar calificación', err);
        Swal.fire('Error', 'No se pudo guardar la calificación', 'error');
      }
    });
  }
}
