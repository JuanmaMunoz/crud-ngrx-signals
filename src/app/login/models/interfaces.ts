import { HttpErrorResponse } from '@angular/common/http';

export interface ILoginState {
  loading: boolean;
  error: HttpErrorResponse | null;
  success: boolean;
}
