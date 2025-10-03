import { HttpErrorResponse } from '@angular/common/http';

export interface IGetUsers {
  page: number;
  number: number;
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
}
