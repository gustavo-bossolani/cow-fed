import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';

import { AuthComponent } from './auth.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../shared/services/auth/auth.service';

import { InputModule } from '../shared/components/input/input.module';
import { ButtonModule } from '../shared/components/button/button.module';
import { LoaderModule } from '../shared/components/loader/loader.module';

@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InputModule,
    ButtonModule,
    LoaderModule
  ],
  providers: [AuthService]
})
export class AuthModule { }
