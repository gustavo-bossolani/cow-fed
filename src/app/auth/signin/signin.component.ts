import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


import { BehaviorSubject, map, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from 'src/app/shared/services/auth/auth.service';

import { SigninForm } from 'src/app/shared/models/auth/signin/signin-form.model';
import { Router } from '@angular/router';

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
    private authService: AuthService,
    private router: Router
  ) { }

  handleSubmit() {
    const { username, password } = this.signinForm.value as SigninForm;

    this.isLoading$.next(true);
    this.signinForm.disable();

    this.authService.signin({ username, password })
      .subscribe(
        {
          next: ({ access }) => {
            if (access) {
              this.isLoading$.next(false);
              this.signinForm.reset();
              this.router.navigate(['overview']);
            }
          },
          error: (error: HttpErrorResponse) => {
            this.isLoading$.next(false);
            this.signinForm.enable();
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
