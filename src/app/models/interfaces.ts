import { HttpErrorResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { TypeInput } from './enums';

export interface ILoginState {
  loading: boolean;
  error: HttpErrorResponse | null;
  success: boolean;
}

export interface ITokenState {
  token: string;
  jwt: IToken;
}

export interface IToken {
  email: string;
  expiration: EpochTimeStamp;
}

export interface IInput {
  type: TypeInput;
  control: FormControl;
  placeholder: string;
  label: string;
  validationErrors?: Record<string, string>;
  focus?: boolean;
  mask?: string;
}
