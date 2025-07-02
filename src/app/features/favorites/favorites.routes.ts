import { Routes } from '@angular/router';
import { FavoriteListComponent } from './favorite-list';

export const FAVORITES_ROUTES: Routes = [
  {
    path: '',
    component: FavoriteListComponent,
    title: 'Mis Favoritos'
  }
];
