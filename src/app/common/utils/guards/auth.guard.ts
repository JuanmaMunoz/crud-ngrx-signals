import { inject, Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { SessionService } from '../../services/session.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  private sessionService = inject(SessionService);
  private router = inject(Router);
  canLoad(): Observable<boolean> {
    return this.sessionService.checkSession().pipe(
      tap((ok: boolean) => {
        if (!ok) {
          this.router.navigate(['/login/403/']);
        }
      }),
    );
  }
}
