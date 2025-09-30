import { createReducer, on } from '@ngrx/store';
import { setInitialState } from '../actions/login.action';
import { createToken } from '../actions/token.action';

export const initialState = {};

export const tokenReducer = createReducer(
  initialState,
  on(createToken, (state, { token }) => ({
    ...state,
    token,
  })),
  on(setInitialState, () => initialState),
);
