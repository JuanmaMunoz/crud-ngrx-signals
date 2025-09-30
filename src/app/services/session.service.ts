import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IToken, ITokenState } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor() {}
  private tokenDuration: number = 60000;
  public token: string = '';
  public jwt: IToken | null = null;

  public checkSession(): Observable<boolean> {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token') as string;
      this.jwt = JSON.parse(this.token);
      return this.jwt!.expiration >= new Date().getTime()
        ? of(true)
        : of(false);
    } else {
      localStorage.removeItem('token');
      this.token = '';
      this.jwt = null;
      return of(false);
    }
  }

  public createFakeToken(email: string): ITokenState {
    this.jwt = {
      email,
      expiration: new Date().getTime() + this.tokenDuration,
    };
    this.token = btoa(JSON.stringify(this.token));
    localStorage.setItem('token', this.token);
    return { token: this.token, jwt: this.jwt };
  }
}
