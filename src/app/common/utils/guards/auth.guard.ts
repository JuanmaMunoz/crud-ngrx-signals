import { inject } from '@angular/core';
import { CanLoadFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs';
import { ITokenState } from '../../models/interfaces';

export const authGuard: CanLoadFn = () => {
  const router = inject(Router);
  const store = inject(Store<{ token: ITokenState }>);
  return store
    .select((state) => state.token.jwt)
    .pipe(
      map((token) => !!token),
      tap((isLoggedIn) => {
        if (!isLoggedIn) {
          router.navigate(['/login/403']);
        }
      }),
    );
};
