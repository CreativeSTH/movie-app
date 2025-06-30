import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { VerifyEmail } from './verify/verify-email';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: Login
  },
  {
    path: 'register',
    component: Register,
  },
  {
    path: 'verify-email',
    component: VerifyEmail
  },
];
