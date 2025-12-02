import { HttpErrorResponse } from '@angular/common/http';

export interface IAuthState {
  loading: boolean;
  error: HttpErrorResponse | null;
  success: boolean;
}
