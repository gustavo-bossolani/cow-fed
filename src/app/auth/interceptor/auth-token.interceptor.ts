import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs';

import { AlertType } from 'src/app/shared/components/alert/models/alert.model';
import { AlertService } from 'src/app/shared/components/alert/services/alert.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(
    private alertService: AlertService,
    private authService: AuthService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    const token = sessionStorage.getItem(environment.authTokenSessionKey);

    if (token) {
      const requestWithHeaders = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      return next.handle(requestWithHeaders)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
              this.authService.logout();
              this.alertService.openAlert({ type: AlertType.INFO, message: 'Sessão está expirada, faça o login novamente para seguir.' });
            }
            throw new Error('Expired Session.');
          })
        );
    }

    return next.handle(request);
  }
}
