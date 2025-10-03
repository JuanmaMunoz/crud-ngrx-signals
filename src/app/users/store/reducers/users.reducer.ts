import { createReducer, on } from '@ngrx/store';
import { IUsersState } from '../../models/interfaces';
import {
  getUsers,
  getUsersFailure,
  getUsersSuccess,
  setInitialState,
} from '../actions/users.action';

export const initialState: IUsersState = {
  loading: false,
  error: null,
  users: [],
};

export const usersReducer = createReducer(
  initialState,
  on(getUsers, (state) => ({ ...state, loading: true })),
  on(getUsersSuccess, (state, { users }) => ({
    ...state,
    loading: false,
    error: null,
    users: users,
  })),
  on(getUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    users: [],
    error,
  })),
  on(setInitialState, () => initialState),
);
