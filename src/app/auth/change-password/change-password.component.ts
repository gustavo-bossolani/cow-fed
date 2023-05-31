import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, map, tap } from 'rxjs';

import { ChangePasswordForm } from 'src/app/shared/models/auth/change-password/change-password-form';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'cow-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.sass']
})
export class ChangePasswordComponent {

  private noSpacePatternRegex = /^\S+$/;
  protected isLoading$ = new BehaviorSubject<boolean>(false);
  protected changePasswordForm = this.builder.group({
    username: ['', [Validators.required]],
    secret: ['', [Validators.required]],
    newPassword: ['', [
      Validators.required,
      Validators.pattern(this.noSpacePatternRegex),
      Validators.minLength(8),
      Validators.maxLength(32),
    ]]
  });

  constructor(
    private builder: FormBuilder,
    private authService: AuthService
  ) { }

  handlePasswordChange() {

    const { username, secret, newPassword } = this.changePasswordForm.value as ChangePasswordForm;

    this.isLoading$.next(true);
    this.changePasswordForm.disable();

    this.authService.changePassword({ username, secret, newPassword })
      .subscribe(
        {
          next: response => {
            this.changePasswordForm.reset();
            console.log('access', response);
          },
          error: (error: HttpErrorResponse) => {
            this.isLoading$.next(false);
            this.changePasswordForm.enable();
            if (error.status === 401) {
              this.changePasswordForm.setErrors({ wrongCredentials: true });
              for (const field in this.changePasswordForm.controls) {
                const control = this.changePasswordForm.get(field);
                control?.setErrors({ wrongCredentials: true });
              }

            } else {
              this.changePasswordForm.setErrors({ systemError: true })
              for (const field in this.changePasswordForm.controls) {
                const control = this.changePasswordForm.get(field);
                control?.setErrors({ systemError: true });
              }
            }
          }
        }
      )
  }

}

