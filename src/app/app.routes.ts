import { Routes } from '@angular/router';
import { AuthGuard } from './common/utils/guards/auth.guard';
import { LoginGuard } from './login/utils/guards/login.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canLoad: [LoginGuard],
    loadChildren: () =>
      import('./login/login.routes').then((m) => m.LOGIN_ROUTES),
  },
  {
    path: 'users',
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./users/users.routes').then((m) => m.USERS_ROUTES),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
