import { createAction, props } from '@ngrx/store';
import { IToken } from '../../models/interfaces';

export const createToken = createAction(
  '[Token] create Token',
  props<{ token: string; jwt: IToken | null }>(),
);
export const setInitialStateToken = createAction('[Token] Set initial state');
