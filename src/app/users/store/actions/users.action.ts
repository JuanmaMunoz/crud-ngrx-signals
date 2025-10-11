import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { IGetUsers, IUser } from '../../models/interfaces';

//GET USERS
export const getUsers = createAction('[Users] Get Users', props<IGetUsers>());
export const getUsersSuccess = createAction(
  '[Users] Get Users Success',
  props<{ users: IUser[] }>(),
);
export const getUsersFailure = createAction(
  '[Users] Get Users Failure',
  props<{ error: HttpErrorResponse }>(),
);
export const setInitialState = createAction('[Users] Set Initial State Users');

//DELETE USER
export const startDeleteUser = createAction(
  '[User] Delete User',
  props<{ user: IUser }>(),
);
export const deleteUserConfirm = createAction('[User] Delete User confirm');
export const deleteUserSuccess = createAction('[User] Delete User Success');
export const deleteUserFailure = createAction(
  '[User] Delete User Failure',
  props<{ error: HttpErrorResponse }>(),
);
export const setInitialStateDelete = createAction(
  '[User] Set Initial State Delete',
);

//GET USER DETAIL
export const getUserDetail = createAction(
  '[User] Get User Detail',
  props<{ email: string }>(),
);
export const getUserDetailSuccess = createAction(
  '[User] Get User Detail Success',
);
export const getUserDetailFailure = createAction(
  '[User] Get User Detail Failure',
  props<{ error: HttpErrorResponse }>(),
);
export const setInitialStateUserDetail = createAction(
  '[User] Set Initial State Detail',
);
