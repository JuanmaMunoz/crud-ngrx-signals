import { inject } from '@angular/core';
import { CanLoadFn, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { SessionService } from '../../../common/services/session.service';

export const loginGuard: CanLoadFn = () => {
  const sessionService = inject(SessionService);
  const router = inject(Router);

  return sessionService.checkSession().pipe(
    map((ok) => !ok),
    tap((ok) => {
      if (!ok) {
        router.navigate(['/users']);
      }
    }),
  );
};
