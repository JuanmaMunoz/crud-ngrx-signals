import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { createToken } from '../../../common/store/actions/token.action';
import { LoginService } from '../../services/login.service';
import {
  loginFailure,
  loginSuccess,
  startLogin,
} from '../actions/login.action';

@Injectable()
export class LoginEffects {
  private actions$ = inject(Actions);
  private loginService = inject(LoginService);

  startLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startLogin),
      mergeMap((data) =>
        this.loginService.startLogin(data.email, data.pass).pipe(
          mergeMap((data) => [
            loginSuccess(),
            createToken({ token: data.token, jwt: data.jwt }),
          ]),
          catchError((error) => of(loginFailure({ error: error.error }))),
        ),
      ),
    ),
  );
}
