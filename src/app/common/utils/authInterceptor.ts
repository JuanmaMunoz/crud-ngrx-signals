// auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, switchMap, take, throwError } from 'rxjs';
import { ITokenState } from '../models/interfaces';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store<{ token: ITokenState }>);

  return store
    .select((state) => state.token.token)
    .pipe(
      take(1),
      switchMap((token) => {
        const authReq = token
          ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
          : req;
        return next(authReq).pipe(
          catchError((err) => {
            if (err.status === 401) {
              //Code session expired, abaible in real API
            }
            return throwError(() => err);
          }),
        );
      }),
    );
};
