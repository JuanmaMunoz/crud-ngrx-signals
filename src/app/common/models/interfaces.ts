import { FormControl } from '@angular/forms';
import { TypeInput } from './enum';

export interface ITokenState {
  token: string;
  jwt: IToken | null;
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
