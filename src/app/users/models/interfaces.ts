import { HttpErrorResponse } from '@angular/common/http';
import { Color } from './enums';

export interface IGetUsersParams {
  page: number;
  number: number;
  search: string;
}

export interface IReqGetUsers {
  users: IUser[];
  totalPages: number;
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
  page: number;
  search: string;
}

export interface IUserDeleteState {
  loading: boolean;
  error: HttpErrorResponse | null;
  success: boolean;
  user: IUser | null;
}

export interface IUserEditState {
  loading: boolean;
  error: HttpErrorResponse | null;
  success: boolean;
  userDetail: IUserDetail | null;
  oldEmail: string;
}

export interface IUserCreateState {
  loading: boolean;
  error: HttpErrorResponse | null;
  success: boolean;
  userDetail: IUserDetail | null;
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

export interface IBoxInfo {
  label: string;
  value: string | number;
  color: Color;
}

export interface IDataset {
  label: string;
  data: number[];
  backgroundColor: string[];
}

export interface ICharData {
  labels: string[];
  datasets: IDataset[];
}

export interface IAvatar {
  title: string;
  description: string;
  modeRow?: boolean;
}
