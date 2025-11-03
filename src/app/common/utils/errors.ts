import { HttpErrorResponse } from '@angular/common/http';
import { mergeMap, throwError, timer } from 'rxjs';
const delay: number = 200;

export const unknownError = timer(delay).pipe(
  mergeMap(() =>
    throwError(
      () =>
        ({
          status: 500,
          error: {
            code: 'ERROR_UNKNOWN',
            message: 'There is an unknown error in the system.',
          },
        }) as HttpErrorResponse,
    ),
  ),
);

export const sessionExpiredError = {
  status: 401,
  error: {
    code: 'SESSION_EXPIRED',
    message: 'Your session has expired. Please log in again to continue.',
  },
} as HttpErrorResponse;

export const loginError = timer(delay).pipe(
  mergeMap(() =>
    throwError(
      () =>
        ({
          status: 401,
          error: {
            code: 'UNAUTHORIZED',
            message: 'The username or password you entered is incorrect. Please try again.',
          },
        }) as HttpErrorResponse,
    ),
  ),
);

export const emailInUseError = timer(delay).pipe(
  mergeMap(() =>
    throwError(
      () =>
        ({
          status: 409,
          error: {
            code: 'USER_EMAIL_ALREADY_EXISTS',
            message: 'The email is already in use.',
          },
        }) as HttpErrorResponse,
    ),
  ),
);

export const userNotFoundError = timer(delay).pipe(
  mergeMap(() =>
    throwError(
      () =>
        ({
          status: 404,
          error: {
            code: 'USER_NOT_FOUND',
            message: 'No user found with the provided email.',
          },
        }) as HttpErrorResponse,
    ),
  ),
);
