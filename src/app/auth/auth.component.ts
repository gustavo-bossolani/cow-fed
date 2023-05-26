import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../shared/services/auth/auth.service';

import { SigninForm } from '../shared/models/signin-form.model';
import { BehaviorSubject, Subject, catchError, finalize, map, mergeMap, tap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'cow-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent {

  private spacePattern = /^\S+$/;

  protected isLoading$ = new BehaviorSubject(false);
  protected signinForm = this.builder.group({
    username: [
      '',
      [
        Validators.required,
        Validators.pattern(this.spacePattern)
      ]
    ],
    password: ['', [Validators.required]]
  });

  constructor(
    private builder: FormBuilder,
    private authService: AuthService
  ) { }

  handleSubmit() {
    const { username, password } = this.signinForm.value as SigninForm;

    this.isLoading$.next(true);
    this.signinForm.disable();

    this.authService.signin({ username, password })
      .pipe(
        map(response => response),
        tap({
          error: () => {
            this.isLoading$.next(false);
            this.signinForm.enable();
          },
          complete: () => {
            this.isLoading$.next(false);
            this.signinForm.enable();
          }
        }),
      )
      .subscribe(
        {
          next: response => {
            console.log('access', response.access);
          },
          error: (error: HttpErrorResponse) => {
            if (error.status === 401) {
              this.signinForm.get('username')?.setErrors({ wrongCredentials: true });
              this.signinForm.get('password')?.setErrors({ wrongCredentials: true });
            } else {
              this.signinForm.get('username')?.setErrors({ systemError: true });
              this.signinForm.get('password')?.setErrors({ systemError: true });
            }
          }
        }
      )
  }


}
