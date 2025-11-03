import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { IToken } from '../../../common/models/interfaces';

import { tokenCreate } from '../../../common/store/actions/token.action';
import { LoginService } from '../../services/login.service';
import {
  login,
  loginFailure,
  loginSuccess,
  logout,
  logoutFailure,
  logoutSuccess,
} from '../actions/login.action';

export const loginEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const loginService = inject(LoginService);

    return actions$.pipe(
      ofType(login),
      mergeMap(({ email, pass }) =>
        loginService.login(email, pass).pipe(
          mergeMap((data: IToken) => [
            loginSuccess(),
            tokenCreate({ token: data.token, jwt: data.jwt }),
          ]),
          catchError((error: HttpErrorResponse) => of(loginFailure({ error }))),
        ),
      ),
    );
  },
  { functional: true },
);

export const logoutEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const loginService = inject(LoginService);

    return actions$.pipe(
      ofType(logout),
      mergeMap(() =>
        loginService.logout().pipe(
          map(() => logoutSuccess()),
          catchError((error: HttpErrorResponse) => of(logoutFailure({ error }))),
        ),
      ),
    );
  },
  { functional: true },
);
