import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take, tap } from 'rxjs';
import { ITokenState } from '../../models/interfaces';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const store = inject(Store<{ token: ITokenState }>);
  return store
    .select((state) => state?.token?.jwt?.expiration)
    .pipe(
      take(1),
      map((expiration) => expiration! >= new Date().getTime()),
      tap((isLoggedIn) => {
        if (!isLoggedIn) {
          router.navigate(['/login']);
        }
      }),
    );
};
