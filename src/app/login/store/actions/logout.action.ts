import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

//LOGOUT
export const logout = createAction('[Logout] Logout');
export const logoutSuccess = createAction('[Logout] Logout Success');
export const logoutFailure = createAction(
  '[Logout] Logout Failure',
  props<{ error: HttpErrorResponse }>(),
);
export const setInitialStateLogout = createAction('[Logout] Set Initial State Logout');
