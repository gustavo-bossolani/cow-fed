import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';

import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    const token = this.authService.getToken();

    if (token) {
      const requestWithHeaders = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      return next.handle(requestWithHeaders);
    }

    return next.handle(request);
  }
}
