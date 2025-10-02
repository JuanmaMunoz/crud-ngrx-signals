import { Routes } from '@angular/router';
import { CreateComponent } from './pages/create/create.component';
import { DetailComponent } from './pages/detail/detail.component';
import { ListComponent } from './pages/list/list.component';

export const USERS_ROUTES: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: 'detail/:id',
    component: DetailComponent,
  },
  {
    path: 'create',
    component: CreateComponent,
  },
];
