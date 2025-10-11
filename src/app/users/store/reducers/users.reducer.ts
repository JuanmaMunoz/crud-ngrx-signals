import { createReducer, on } from '@ngrx/store';
import { IUserDeleteState, IUsersState } from '../../models/interfaces';
import {
  deleteUserConfirm,
  deleteUserSuccess,
  getUsers,
  getUsersFailure,
  getUsersSuccess,
  setInitialState,
  setInitialStateDelete,
  startDeleteUser,
} from '../actions/users.action';

//GET USERS

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
    users: users,
  })),
  on(getUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(setInitialState, () => initialState),
);

//DELETE USERS

export const initialStateDelete: IUserDeleteState = {
  loading: false,
  error: null,
  success: false,
  user: null,
};

export const userDeleteReducer = createReducer(
  initialStateDelete,
  on(startDeleteUser, (state, { user }) => ({ ...state, user })),
  on(deleteUserConfirm, (state) => ({ ...state, loading: true })),
  on(deleteUserSuccess, (state) => ({
    ...state,
    loading: false,
    success: true,
  })),
  on(getUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(setInitialStateDelete, () => initialStateDelete),
);
