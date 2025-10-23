import { createReducer, on } from '@ngrx/store';
import { ITokenState } from '../../models/interfaces';
import { createToken, setInitialStateToken } from '../actions/token.action';

export const initialState: ITokenState = { token: '', jwt: null };

export const tokenReducer = createReducer(
  initialState,
  on(createToken, (state, { token, jwt }) => ({
    ...state,
    token,
    jwt,
  })),
  on(setInitialStateToken, () => initialState),
);
