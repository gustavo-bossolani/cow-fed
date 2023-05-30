import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


import { BehaviorSubject, map, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from 'src/app/shared/services/auth/auth.service';

import { SigninForm } from 'src/app/shared/models/auth/signin/signin-form.model';

@Component({
  selector: 'cow-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass']
})
export class SigninComponent {
  protected isLoading$ = new BehaviorSubject(false);
  protected signinForm = this.builder.group({
    username: ['', [Validators.required]],
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
              for (const field in this.signinForm.controls) {
                const control = this.signinForm.get(field);
                control?.setErrors({ wrongCredentials: true });
              }
            } else {
              this.signinForm.setErrors({ systemError: true })
              for (const field in this.signinForm.controls) {
                const control = this.signinForm.get(field);
                control?.setErrors({ systemError: true });
              }
            }
          }
        }
      )
  }
}
