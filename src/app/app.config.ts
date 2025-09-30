import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';

import { LoginEffects } from './store/effects/login.effect';
import { loginReducer } from './store/reducers/login.reducer';
import { tokenReducer } from './store/reducers/token.reducer';
import { authInterceptor } from './utils/authInterceptor';

const store = {
  login: loginReducer,
  token: tokenReducer,
};

const effects = [LoginEffects];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore(store),
    provideEffects(effects),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
  ],
};
