import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SigninForm } from '../../models/signin-form.model';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ChangePasswordForm } from '../../models/change-password-form';

interface SigningResponse {
  access: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth = 'auth';

  constructor(
    private http: HttpClient
  ) { }

  signin({ username, password }: SigninForm): Observable<SigningResponse> {
    return this.http.post<SigningResponse>(
      `${environment.apiUrl}/${this.auth}/signin`,
      { username, password }
    );
  }

  changePassword({ username, newPassword, secret }: ChangePasswordForm): Observable<void> {
    return this.http.put<void>(
      `${environment.apiUrl}/${this.auth}/change-password`,
      { username, newPassword, secret }
    )
  }

}
