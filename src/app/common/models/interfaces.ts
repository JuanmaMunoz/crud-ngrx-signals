import { FormControl } from '@angular/forms';

export interface ITokenState {
  token: string;
  jwt: IToken | null;
}

export interface IToken {
  email: string;
  expiration: EpochTimeStamp;
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
