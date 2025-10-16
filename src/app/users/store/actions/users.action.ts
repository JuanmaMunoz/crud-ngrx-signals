import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { IGetUsersParams, IUser } from '../../models/interfaces';
import { IUserDetail } from './../../models/interfaces';

//GET USERS
export const getUsers = createAction('[Users] Get Users', props<IGetUsersParams>());
export const getUsersSuccess = createAction(
  '[Users] Get Users Success',
  props<{ users: IUser[]; totalPages: number }>(),
);
export const getUsersFailure = createAction(
  '[Users] Get Users Failure',
  props<{ error: HttpErrorResponse }>(),
);
export const setInitialStateGetUsers = createAction('[Users] Set Initial State Users');

//DELETE USER
export const deleteUser = createAction('[User] Delete User', props<{ user: IUser }>());
export const deleteUserConfirm = createAction('[User] Delete User confirm');
export const deleteUserSuccess = createAction('[User] Delete User Success');
export const deleteUserFailure = createAction(
  '[User] Delete User Failure',
  props<{ error: HttpErrorResponse }>(),
);
export const setInitialStateDelete = createAction('[User] Set Initial State Delete');

//GET USER DETAIL
export const getUserDetail = createAction('[User] Get User Detail', props<{ email: string }>());
export const getUserDetailSuccess = createAction(
  '[User] Get User Detail Success',
  props<{ userDetail: IUserDetail }>(),
);
export const getUserDetailFailure = createAction(
  '[User] Get User Detail Failure',
  props<{ error: HttpErrorResponse }>(),
);
export const setInitialStateUserDetail = createAction('[User] Set Initial State Detail');
