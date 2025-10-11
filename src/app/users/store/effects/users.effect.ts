import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { IGetUsers, IUser, IUserDetail } from './../../models/interfaces';
import {
  getUserDetail,
  getUserDetailFailure,
  getUserDetailSuccess,
} from './../actions/users.action';

import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UsersService } from '../../services/users.service';
import {
  deleteUserConfirm,
  deleteUserFailure,
  deleteUserSuccess,
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

export const userDeleteEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const usersService = inject(UsersService);
    const store = inject(Store);
    const userDeleting = toSignal(
      store.select((state) => state.userDelete.user),
      { initialValue: null },
    );
    return actions$.pipe(
      ofType(deleteUserConfirm),
      mergeMap(() =>
        usersService.deleteUser(userDeleting()).pipe(
          map((data: null) => deleteUserSuccess()),
          catchError((error) => of(deleteUserFailure({ error: error.error }))),
        ),
      ),
    );
  },
  { functional: true },
);

export const userGetDetailEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const usersService = inject(UsersService);

    return actions$.pipe(
      ofType(getUserDetail),
      mergeMap((data: { email: string }) =>
        usersService.getUserDetail(data.email).pipe(
          map((data: IUserDetail) =>
            getUserDetailSuccess({ userDetail: data }),
          ),
          catchError((error) =>
            of(getUserDetailFailure({ error: error.error })),
          ),
        ),
      ),
    );
  },
  { functional: true },
);
