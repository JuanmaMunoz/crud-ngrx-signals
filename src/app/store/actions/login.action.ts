import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
export const startLogin = createAction(
  '[Login] Start Login',
  props<{ email: string; pass: string }>(),
);
export const loginSuccess = createAction('[Login] Login Success');
export const loginFailure = createAction(
  '[Login] Login Failure',
  props<{ error: HttpErrorResponse }>(),
);
export const setInitialState = createAction('[Login] Set initial state');
