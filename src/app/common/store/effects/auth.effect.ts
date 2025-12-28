import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { HttpErrorResponse } from '@angular/common/http';
import { from } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { IToken } from '../../models/interfaces';

import { AuthService } from '../../services/auth.service';
import {
  login,
  loginFailure,
  loginSuccess,
  logout,
  logoutFailure,
  logoutSuccess,
} from '../actions/auth.action';
import { messageShow } from '../actions/message.action';
import { tokenCreate } from '../actions/token.action';

export const loginEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const authService = inject(AuthService);

    return actions$.pipe(
      ofType(login),
      mergeMap(({ email, pass }) =>
        authService.login(email, pass).pipe(
          mergeMap((data: IToken) => [
            loginSuccess(),
            tokenCreate({ token: data.token, jwt: data.jwt }),
          ]),
          catchError((error: HttpErrorResponse) =>
            from([loginFailure({ error }), messageShow({ message: error.error.message })]),
          ),
        ),
      ),
    );
  },
  { functional: true },
);

export const logoutEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const authService = inject(AuthService);

    return actions$.pipe(
      ofType(logout),
      mergeMap(() =>
        authService.logout().pipe(
          map(() => logoutSuccess()),
          catchError((error: HttpErrorResponse) =>
            from([logoutFailure({ error }), messageShow({ message: error.error.message })]),
          ),
        ),
      ),
    );
  },
  { functional: true },
);
