import { Routes } from '@angular/router';
import { authGuard  } from './core/guards/auth-guard'

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
   {
    path: 'movies',
    loadChildren: () => import('./features/movies/movies.routes').then(m => m.moviesRoutes),
    canActivate: [authGuard],
  },
  {
    path: 'favorites',
    loadChildren: () => import('./features/favorites/favorites.routes').then(m => m.FAVORITES_ROUTES),
    canActivate: [authGuard],
  },
];
