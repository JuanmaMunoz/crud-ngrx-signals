import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { IGetUsersParams, IReqGetUsers, IUserDetail } from './../../models/interfaces';
import {
  editUser,
  editUserFailure,
  editUserSuccess,
  getUserDetail,
  getUserDetailFailure,
  getUserDetailSuccess,
} from './../actions/users.action';

import { HttpErrorResponse } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
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
      switchMap((data: IGetUsersParams) =>
        usersService.getUsers(data).pipe(
          map((data: IReqGetUsers) =>
            getUsersSuccess({
              users: data.users,
              totalPages: data.totalPages,
            }),
          ),
          catchError((error: HttpErrorResponse) => of(getUsersFailure({ error }))),
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
          catchError((error: HttpErrorResponse) => of(deleteUserFailure({ error }))),
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
          map((data: IUserDetail) => getUserDetailSuccess({ userDetail: data })),
          catchError((error: HttpErrorResponse) => of(getUserDetailFailure({ error }))),
        ),
      ),
    );
  },
  { functional: true },
);

export const userEditEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const usersService = inject(UsersService);

    return actions$.pipe(
      ofType(editUser),
      mergeMap((data: { userDetail: IUserDetail; oldEmail: string }) =>
        usersService.editUser(data.oldEmail, data.userDetail).pipe(
          map((data: null) => editUserSuccess()),
          catchError((error: HttpErrorResponse) => of(editUserFailure({ error }))),
        ),
      ),
    );
  },
  { functional: true },
);
