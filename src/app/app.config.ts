import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideNgxMask } from 'ngx-mask';
import { routes } from './app.routes';
import { tokenReducer } from './common/store/reducers/token.reducer';
import { authInterceptor } from './common/utils/authInterceptor';
import { loginEffect, logoutEffect } from './login/store/effects/auth.effect';

import { loginReducer, logoutReducer } from './login/store/reducers/auth.reducer';

import { metaReducers } from './common/store/reducers/clear-state.metareducer';
import {
  userCreateEffect,
  userDeleteEffect,
  userEditEffect,
  userGetDetailEffect,
  usersEffect,
} from './users/store/effects/users.effect';
import {
  userCreateReducer,
  userDeleteReducer,
  userEditReducer,
  userGetDetailReducer,
  usersReducer,
} from './users/store/reducers/users.reducer';

const store = {
  login: loginReducer,
  logout: logoutReducer,
  token: tokenReducer,
  users: usersReducer,
  userDelete: userDeleteReducer,
  userDetail: userGetDetailReducer,
  userEdit: userEditReducer,
  userCreate: userCreateReducer,
};

const effects = [
  {
    loginEffect,
    logoutEffect,
    usersEffect,
    userDeleteEffect,
    userGetDetailEffect,
    userEditEffect,
    userCreateEffect,
  },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes, withHashLocation()),
    provideNgxMask(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore(store, { metaReducers }),
    provideEffects(effects),

    provideStoreDevtools({ maxAge: 25, logOnly: false }),
  ],
};
