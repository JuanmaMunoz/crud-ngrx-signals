import { Routes } from '@angular/router';
import { CreateComponent } from './pages/create/create.component';
import { DetailComponent } from './pages/detail/detail.component';
import { ListComponent } from './pages/list/list.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'users',
    component: ListComponent,
  },
  {
    path: 'users/:id',
    component: DetailComponent,
  },
  {
    path: 'users/create',
    component: CreateComponent,
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
