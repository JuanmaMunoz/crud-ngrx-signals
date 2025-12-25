import { HttpErrorResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';

export interface ITokenState {
  token: string;
  jwt: IJWT | null;
  error: HttpErrorResponse | null;
}

export interface IMessageState {
  message: string | null;
}

export interface IJWT {
  email: string;
  expiration: EpochTimeStamp;
}

export interface IToken {
  jwt: IJWT;
  token: string;
}

export interface IInput {
  control: FormControl;
  placeholder: string;
  label: string;
  validationErrors?: Record<string, string>;
  focus?: boolean;
  mask?: string;
}

export interface IInputNumber extends IInput {
  min: number;
  max: number;
}
