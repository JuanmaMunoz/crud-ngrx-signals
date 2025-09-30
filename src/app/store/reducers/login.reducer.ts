import { createReducer, on } from '@ngrx/store';
import { ILoginState } from '../../models/interfaces';
import {
  loginFailure,
  loginSuccess,
  setInitialState,
  startLogin,
} from '../actions/login.action';

export const initialState: ILoginState = {
  loading: false,
  error: null,
};

export const loginReducer = createReducer(
  initialState,
  on(startLogin, (state) => ({ ...state, loading: true })),
  on(loginSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(setInitialState, () => initialState),
);
