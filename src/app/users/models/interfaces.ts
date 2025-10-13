import { HttpErrorResponse } from '@angular/common/http';

export interface IGetUsers {
  page: number;
  number: number;
  search: string;
}

export interface IReqGetUsers {
  users: IUser[];
  totalPages: number;
  currentPage: number;
  search: string;
}

export interface IUser {
  email: string;
  name: string;
  lastName: string;
  position: string;
  date: EpochTimeStamp;
  salary: number;
}

export interface IUsersState {
  loading: boolean;
  error: HttpErrorResponse | null;
  users: IUser[];
  totalPages: number;
  currentPage: number;
  search: string;
}

export interface IUserDeleteState {
  loading: boolean;
  error: HttpErrorResponse | null;
  success: boolean;
  user: IUser | null;
}

export interface IUserStatistics {
  email: string;
  productivity: number;
  hardworking: number;
  coworker: number;
  knowledge: number;
  proactivity: number;
}

export interface IUserDetail {
  info: IUser;
  statistics: IUserStatistics;
}

export interface IUserGetDetailState {
  loading: boolean;
  error: HttpErrorResponse | null;
  userDetail: IUserDetail | null;
}
