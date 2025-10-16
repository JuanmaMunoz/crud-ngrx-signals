import { createReducer, on } from '@ngrx/store';

import { ILoginState } from '../../models/interfaces';
import { login, loginFailure, loginSuccess, setInitialState } from '../actions/login.action';

export const initialState: ILoginState = {
  loading: false,
  error: null,
  success: false,
};

export const loginReducer = createReducer(
  initialState,
  on(login, (state) => ({ ...state, loading: true, error: null })),
  on(loginSuccess, (state) => ({
    ...state,
    loading: false,
    success: true,
    error: null,
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(setInitialState, () => initialState),
);
