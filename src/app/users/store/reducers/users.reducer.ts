import { createReducer, on } from '@ngrx/store';
import { IUserDeleteState, IUserGetDetailState, IUsersState } from '../../models/interfaces';
import {
  deleteUser,
  deleteUserConfirm,
  deleteUserSuccess,
  getUserDetail,
  getUserDetailSuccess,
  getUsers,
  getUsersFailure,
  getUsersSuccess,
  setInitialState,
  setInitialStateDelete,
} from '../actions/users.action';

//GET USERS

export const initialState: IUsersState = {
  loading: false,
  error: null,
  users: [],
  totalPages: 0,
};

export const usersReducer = createReducer(
  initialState,
  on(getUsers, (state) => ({ ...state, loading: true })),
  on(getUsersSuccess, (state, { users, totalPages }) => ({
    ...state,
    loading: false,
    users,
    totalPages,
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
  on(deleteUser, (state, { user }) => ({ ...state, user })),
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

//GET DETAIL USER

export const initialStateGetDetail: IUserGetDetailState = {
  loading: false,
  error: null,
  userDetail: null,
};

export const userGetDetailReducer = createReducer(
  initialStateGetDetail,
  on(getUserDetail, (state) => ({ ...state, loading: true })),
  on(getUserDetailSuccess, (state, { userDetail }) => ({
    ...state,
    loading: false,
    userDetail,
  })),
  on(getUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(setInitialStateDelete, () => initialStateGetDetail),
);
