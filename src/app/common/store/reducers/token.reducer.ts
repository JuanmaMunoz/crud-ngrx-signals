import { createReducer, on } from '@ngrx/store';
import { ITokenState } from '../../models/interfaces';
import { setInitialStateToken, tokenCreate, tokenError } from '../actions/token.action';

export const initialState: ITokenState = { token: '', jwt: null, error: null };

export const tokenReducer = createReducer(
  initialState,
  on(tokenCreate, (state, { token, jwt }) => ({
    ...state,
    token,
    jwt,
  })),
  on(tokenError, (state, { error }) => ({
    ...state,
    error,
  })),
  on(setInitialStateToken, () => initialState),
);
