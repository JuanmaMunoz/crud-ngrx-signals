import { createReducer, on } from '@ngrx/store';
import {
  IUserDeleteState,
  IUserEditState,
  IUserGetDetailState,
  IUsersState,
} from '../../models/interfaces';
import {
  deleteUser,
  deleteUserConfirm,
  deleteUserFailure,
  deleteUserSuccess,
  editUser,
  editUserFailure,
  editUserSuccess,
  getUserDetail,
  getUserDetailFailure,
  getUserDetailSuccess,
  getUsers,
  getUsersFailure,
  getUsersSuccess,
  setInitialStateDelete,
  setInitialStateEdit,
  setInitialStateGetUsers,
  setInitialStateUserDetail,
} from '../actions/users.action';

//GET USERS

export const initialStateGetUsers: IUsersState = {
  loading: false,
  error: null,
  users: [],
  totalPages: 0,
  page: 1,
  search: '',
};

export const usersReducer = createReducer(
  initialStateGetUsers,
  on(getUsers, (state, { page, search }) => ({
    ...state,
    page,
    search,
    users: [],
    loading: true,
    firstLoad: false,
  })),
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
  on(setInitialStateGetUsers, () => initialStateGetUsers),
);

//DELETE USER

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
  on(deleteUserFailure, (state, { error }) => ({
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
  on(getUserDetailFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(setInitialStateUserDetail, () => initialStateGetDetail),
);

//EDIT USER

export const initialStateEdit: IUserEditState = {
  loading: false,
  error: null,
  success: false,
  userDetail: null,
  oldEmail: '',
};

export const userEditReducer = createReducer(
  initialStateEdit,
  on(editUser, (state, { userDetail, oldEmail }) => ({
    ...state,
    userDetail,
    loading: true,
    oldEmail,
  })),
  on(editUserSuccess, (state) => ({
    ...state,
    loading: false,
    success: true,
  })),
  on(editUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(setInitialStateEdit, () => initialStateEdit),
);
