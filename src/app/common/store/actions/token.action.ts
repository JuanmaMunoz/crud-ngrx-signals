import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { IJWT } from '../../models/interfaces';

export const tokenCreate = createAction(
  '[Token] Token Creation',
  props<{ token: string; jwt: IJWT | null }>(),
);
export const tokenError = createAction(
  '[Token] Token Error',
  props<{ error: HttpErrorResponse }>(),
);
export const setInitialStateToken = createAction('[Token] Set initial state');
