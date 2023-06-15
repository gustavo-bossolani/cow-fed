import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable, catchError, map, mergeMap, of, tap } from 'rxjs';

import { environment } from 'src/environments/environment';

import { SigninForm } from '../../models/auth/signin/signin-form.model';
import { ChangePasswordForm } from '../../models/auth/change-password/change-password-form';

import { UserService } from '../user/user.service';

interface SigningResponse {
  access: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authRoute = 'auth';

  isLogged$ = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) { }

  signin({ username, password }: SigninForm): Observable<SigningResponse> {
    return this.http.post<SigningResponse>(
      `${environment.apiUrl}/${this.authRoute}/signin`,
      { username, password }
    )
      .pipe(
        tap(response => sessionStorage.setItem(environment.authTokenSessionKey, response.access)
      ),
    );
  }

  changePassword({ username, newPassword, secret }: ChangePasswordForm): Observable<void> {
    return this.http.put<void>(
      `${environment.apiUrl}/${this.authRoute}/change-password`,
      { username, newPassword, secret }
    )
  }

  logout(): void {
    sessionStorage.removeItem(environment.authTokenSessionKey);
    this.userService.user$.next(null);
    this.isLogged$.next(false);
    this.router.navigate(['auth']);
  }

  userHaveSession(): Observable<boolean> {
    const token = sessionStorage.getItem(environment.authTokenSessionKey);

    if (!token) {
      return of(false);
    }

    return of(token)
      .pipe(
        mergeMap(token => {
          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          })
          return this.http.get(`${environment.apiUrl}/${this.authRoute}`, { headers })
            .pipe(
              tap(() => {
                if (!this.isLogged$.value) {
                  this.isLogged$.next(true);
                }
              }),
              map(() => true),
              catchError(() => {
                if (this.isLogged$.value) {
                  this.isLogged$.next(false);
                }
                return of(false)
              })
            );
        }),
      );
  }

}
