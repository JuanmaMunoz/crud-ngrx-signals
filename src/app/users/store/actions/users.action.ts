import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { IGetUsers, IUser } from '../../models/interfaces';
export const getUsers = createAction('[Users] Get Users', props<IGetUsers>());
export const getUsersSuccess = createAction(
  '[Users] Get Users Success',
  props<{ users: IUser[] }>(),
);
export const getUsersFailure = createAction(
  '[Users] Get Users Failure',
  props<{ error: HttpErrorResponse }>(),
);
export const setInitialState = createAction('[Users] Set initial state');
