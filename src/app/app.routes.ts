import { Routes } from '@angular/router';
import { authGuard } from './common/utils/guards/auth.guard';
import { loginGuard } from './login/utils/guards/login.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canLoad: [loginGuard],
    loadChildren: () => import('./login/login.routes').then((m) => m.LOGIN_ROUTES),
  },
  {
    path: 'users',
    canLoad: [authGuard],
    loadChildren: () => import('./users/users.routes').then((m) => m.USERS_ROUTES),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
