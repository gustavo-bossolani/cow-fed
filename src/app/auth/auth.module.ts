import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';

import { AuthComponent } from './auth.component';

import { ChangePasswordModule } from './change-password/change-password.module';
import { SigninModule } from './signin/signin.module';
import { RouterModule } from '@angular/router';

import { AuthTokenInterceptor } from './interceptor/auth-token.interceptor';

@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AuthRoutingModule,
    ChangePasswordModule,
    SigninModule
  ],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        AuthTokenInterceptor
      ]
    }
  }
}
