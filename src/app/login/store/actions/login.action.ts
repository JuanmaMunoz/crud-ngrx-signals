import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

//LOGIN
export const login = createAction('[Login] Start Login', props<{ email: string; pass: string }>());
export const loginSuccess = createAction('[Login] Login Success');
export const loginFailure = createAction(
  '[Login] Login Failure',
  props<{ error: HttpErrorResponse }>(),
);
export const setInitialStateLogin = createAction('[Login] Set Initial State');
