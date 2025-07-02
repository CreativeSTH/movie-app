import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../../models/movie';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss'
})
export class MovieCardComponent {
  @Input() movie!: Movie;

  @Input() showFavorite = true;
  @Input() showDelete = false;

  @Input() isFavoriteList = false; // ✅ añadido

  @Output() favorite = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  onFavoriteClick() {
    this.favorite.emit(this.movie.imdbID);
  }

  onDeleteClick() {
    this.delete.emit(this.movie.imdbID);
  }
}
