import { inject } from '@angular/core';
import { CanLoadFn, Router } from '@angular/router';
import { tap } from 'rxjs';
import { SessionService } from '../../services/session.service';

export const authGuard: CanLoadFn = () => {
  const sessionService = inject(SessionService);
  const router = inject(Router);

  return sessionService.checkSession().pipe(
    tap((ok) => {
      if (!ok) {
        router.navigate(['/login/403']);
      }
    }),
  );
};
