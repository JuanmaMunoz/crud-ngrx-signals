import { inject, Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { SessionService } from '../../../common/services/session.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanLoad {
  private sessionService = inject(SessionService);
  private router = inject(Router);
  canLoad(): Observable<boolean> {
    return this.sessionService.checkSession().pipe(
      map((ok: boolean) => !ok),
      tap((ok: boolean) => {
        if (!ok) {
          this.router.navigate(['/users']);
        }
      }),
    );
  }
}
