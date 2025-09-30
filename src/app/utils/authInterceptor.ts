// auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { SessionService } from '../services/session.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const sessionService = inject(SessionService);
  const router = inject(Router);

  const token = sessionService.token;

  // If There is toke, clone de request
  const authReq = token
    ? req.clone({ setHeaders: { authorization: token } })
    : req;

  return next(authReq).pipe(
    catchError((err) => {
      if (err.status === 401) {
        router.navigate(['/login/401']);
      }
      return throwError(() => err);
    }),
  );
};
