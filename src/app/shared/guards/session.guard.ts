import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, map, tap } from 'rxjs';

import { AlertService } from '../components/alert/services/alert.service';
import { AlertType } from '../components/alert/models/alert.model';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard {

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
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
            this.alertService.openAlert({ type: AlertType.INFO, message: 'Sessão está expirada, faça o login novamente para seguir.' })
          }
        }),
      )
  }

}
