import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';

import { AuthComponent } from './auth.component';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from '../shared/services/auth/auth.service';

import { ChangePasswordModule } from './change-password/change-password.module';
import { SigninModule } from './signin/signin.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    AuthRoutingModule,
    ChangePasswordModule,
    SigninModule
  ],
  providers: [AuthService]
})
export class AuthModule { }
