import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { Observable, pipe, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService
      .isUserLogged()
      .pipe(
        tap(isLogged => {
          if (!isLogged) {
            this.router.navigate(['auth']);
          }
        })
      )
  }

}
