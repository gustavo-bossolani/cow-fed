import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable, Subject, catchError, map, mergeMap, of, tap } from 'rxjs';

import { environment } from 'src/environments/environment';

import { SigninForm } from '../../models/auth/signin/signin-form.model';
import { ChangePasswordForm } from '../../models/auth/change-password/change-password-form';

import { User } from '../../models/user/user.model';

interface SigningResponse {
  access: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authRoute = 'auth';
  private userRoute = 'user';

  user$ = new Subject<User>();
  isLogged$ = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router
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
    this.user$ = new Subject<User>();
    this.isLogged$.next(false);
    this.router.navigate(['auth'])
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
              map(() => true),
              catchError(() => of(false))
            );
        }),
      );
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/${this.userRoute}`)
      .pipe(
        tap(user => this.user$.next(user))
      );
  }

}
