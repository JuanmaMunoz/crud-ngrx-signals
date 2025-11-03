import { HttpErrorResponse } from '@angular/common/http';
import { mergeMap, throwError, timer } from 'rxjs';
const delay: number = 200;

export const unknownError = new HttpErrorResponse({
  status: 500,
  error: {
    code: 'ERROR_UNKNOWN',
    message: 'There is an unknown error in the system.',
  },
});

export const sessionExpiredError = new HttpErrorResponse({
  status: 401,
  error: {
    code: 'SESSION_EXPIRED',
    message: 'Your session has expired. Please log in again to continue.',
  },
});

export const loginError = new HttpErrorResponse({
  status: 401,
  error: {
    code: 'UNAUTHORIZED',
    message: 'The username or password you entered is incorrect. Please try again.',
  },
});

export const emailInUseError = new HttpErrorResponse({
  status: 409,
  error: {
    code: 'USER_EMAIL_ALREADY_EXISTS',
    message: 'The email is already in use.',
  },
});

export const unknownError$ = timer(delay).pipe(mergeMap(() => throwError(() => unknownError)));

export const loginError$ = timer(delay).pipe(mergeMap(() => throwError(() => loginError)));

export const emailInUseError$ = timer(delay).pipe(
  mergeMap(() => throwError(() => emailInUseError)),
);

export const userNotFoundError = new HttpErrorResponse({
  status: 404,
  error: {
    code: 'USER_NOT_FOUND',
    message: 'No user found with the provided email.',
  },
});

export const userNotFoundError$ = timer(delay).pipe(
  mergeMap(() => throwError(() => userNotFoundError)),
);
