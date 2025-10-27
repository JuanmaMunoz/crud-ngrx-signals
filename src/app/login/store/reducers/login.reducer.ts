import { createReducer, on } from '@ngrx/store';

import { ILoginState } from '../../models/interfaces';
import {
  login,
  loginFailure,
  loginSuccess,
  logout,
  logoutFailure,
  logoutSuccess,
  setInitialStateLogin,
  setInitialStateLogout,
} from '../actions/login.action';

export const initialStateLogin: ILoginState = {
  loading: false,
  error: null,
  success: false,
};

export const loginReducer = createReducer(
  initialStateLogin,
  on(login, (state) => ({ ...state, loading: true, error: null })),
  on(loginSuccess, (state) => ({
    ...state,
    loading: false,
    success: true,
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(setInitialStateLogin, () => initialStateLogin),
);

export const initialStateLogout: ILoginState = {
  loading: false,
  error: null,
  success: false,
};

export const logoutReducer = createReducer(
  initialStateLogout,
  on(logout, (state) => ({ ...state, loading: true, error: null })),
  on(logoutSuccess, (state) => ({
    ...state,
    loading: false,
    success: true,
  })),
  on(logoutFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(setInitialStateLogout, () => initialStateLogout),
);
