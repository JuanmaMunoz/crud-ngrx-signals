import { createReducer, on } from '@ngrx/store';

import { ILoginState } from '../../models/interfaces';
import {
  logout,
  logoutFailure,
  logoutSuccess,
  setInitialStateLogout,
} from '../actions/logout.action';

export const initialState: ILoginState = {
  loading: false,
  error: null,
  success: false,
};

export const logoutReducer = createReducer(
  initialState,
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
  on(setInitialStateLogout, () => initialState),
);
