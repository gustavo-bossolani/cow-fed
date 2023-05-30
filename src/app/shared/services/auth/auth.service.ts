import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, combineLatestWith, map, take } from 'rxjs';

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

  private authToken$ = new BehaviorSubject<string | null>(null);
  private user$ = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient
  ) { }

  signin({ username, password }: SigninForm): Observable<SigningResponse> {
    return this.http.post<SigningResponse>(
      `${environment.apiUrl}/${this.authRoute}/signin`,
      { username, password }
    );
  }

  changePassword({ username, newPassword, secret }: ChangePasswordForm): Observable<void> {
    return this.http.put<void>(
      `${environment.apiUrl}/${this.authRoute}/change-password`,
      { username, newPassword, secret }
    )
  }

  logout(): void {
    this.authToken$.next(null);
    this.user$.next(null);
  }

  isUserLogged(): Observable<boolean> {
    return this.authToken$
      .pipe(
        combineLatestWith(this.user$),
        map(([token, user]) => {
          return !!token && !!user;
        })
      )
  }

  getAuthToken(): Observable<string | null> {
    return this.authToken$.asObservable();
  }

  getUser(): Observable<User | null> {
    return this.user$.asObservable();
  }

}
