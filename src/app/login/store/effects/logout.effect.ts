import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { setInitialStateToken } from '../../../common/store/actions/token.action';
import { LoginService } from '../../services/login.service';
import { loginFailure } from '../actions/login.action';
import { logout, logoutSuccess } from '../actions/logout.action';

export const logoutEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const loginService = inject(LoginService);

    return actions$.pipe(
      ofType(logout),
      mergeMap(() =>
        loginService.logout().pipe(
          mergeMap(() => [logoutSuccess(), setInitialStateToken()]),
          catchError((error: HttpErrorResponse) => of(loginFailure({ error }))),
        ),
      ),
    );
  },
  { functional: true },
);
