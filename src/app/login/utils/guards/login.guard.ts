import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs';
import { ITokenState } from '../../../common/models/interfaces';

export const loginGuard: CanActivateFn = () => {
  const router = inject(Router);

  const store = inject(Store<{ token: ITokenState }>);
  return store
    .select((state) => state?.token?.jwt?.expiration)
    .pipe(
      map((expiration) => expiration! >= new Date().getTime()),
      map((isLoggedIn) => !isLoggedIn),
      tap((isLoggedIn) => {
        if (!isLoggedIn) {
          router.navigate(['/users']);
        }
      }),
    );
};
