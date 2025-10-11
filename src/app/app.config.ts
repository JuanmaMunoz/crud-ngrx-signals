import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { tokenReducer } from './common/store/reducers/token.reducer';
import { authInterceptor } from './common/utils/authInterceptor';
import { loginEffect } from './login/store/effects/login.effect';
import { loginReducer } from './login/store/reducers/login.reducer';
import {
  userDeleteEffect,
  usersEffect,
} from './users/store/effects/users.effect';
import {
  userDeleteReducer,
  usersReducer,
} from './users/store/reducers/users.reducer';

const store = {
  login: loginReducer,
  token: tokenReducer,
  users: usersReducer,
  userDelete: userDeleteReducer,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore(store),
    provideEffects([{ loginEffect, usersEffect, userDeleteEffect }]),

    provideStoreDevtools({ maxAge: 25, logOnly: false }),
  ],
};
