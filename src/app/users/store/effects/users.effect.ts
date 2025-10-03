import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { IGetUsers, IUser } from './../../models/interfaces';

import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UsersService } from '../../services/users.service';
import {
  getUsers,
  getUsersFailure,
  getUsersSuccess,
} from '../actions/users.action';

export const usersEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const usersService = inject(UsersService);

    return actions$.pipe(
      ofType(getUsers),
      mergeMap((data: IGetUsers) =>
        usersService.getUsers(data).pipe(
          map((data: IUser[]) => getUsersSuccess({ users: data })),
          catchError((error) => of(getUsersFailure({ error: error.error }))),
        ),
      ),
    );
  },
  { functional: true },
);
