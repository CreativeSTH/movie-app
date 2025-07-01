import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { VerifyEmail } from './verify/verify-email';
import { publicOnlyGuard } from '../../core/guards/auth-guard'

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: Login,
    canActivate: [publicOnlyGuard],
  },
  {
    path: 'register',
    component: Register,
    canActivate: [publicOnlyGuard],
  },
  {
    path: 'verify-email',
    component: VerifyEmail
  },
];
