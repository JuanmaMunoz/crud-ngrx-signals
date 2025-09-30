import { HttpErrorResponse } from '@angular/common/http';

export interface ILoginState {
  loading: boolean;
  error: HttpErrorResponse | null;
}

export interface ITokenState {
  token: string;
  jwt: IToken;
}

export interface IToken {
  email: string;
  expiration: EpochTimeStamp;
}
