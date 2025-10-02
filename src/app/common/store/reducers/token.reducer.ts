import { createReducer, on } from '@ngrx/store';
import { setInitialState } from '../../../login/store/actions/login.action';
import { ITokenState } from '../../models/interfaces';
import { createToken } from '../actions/token.action';

export const initialState: ITokenState = { token: '', jwt: null };

export const tokenReducer = createReducer(
  initialState,
  on(createToken, (state, { token, jwt }) => ({
    ...state,
    token,
    jwt,
  })),
  on(setInitialState, () => initialState),
);
