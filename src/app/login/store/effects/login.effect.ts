import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { ITokenState } from '../../../common/models/interfaces';
import { createToken } from '../../../common/store/actions/token.action';
import { LoginService } from '../../services/login.service';
import {
  loginFailure,
  loginSuccess,
  startLogin,
} from '../actions/login.action';

export const loginEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const loginService = inject(LoginService);

    return actions$.pipe(
      ofType(startLogin),
      mergeMap(({ email, pass }) =>
        loginService.startLogin(email, pass).pipe(
          mergeMap((data: ITokenState) => [
            loginSuccess(),
            createToken({ token: data.token, jwt: data.jwt }),
          ]),
          catchError((error) => of(loginFailure({ error: error.error }))),
        ),
      ),
    );
  },
  { functional: true },
);
