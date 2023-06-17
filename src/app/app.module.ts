import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';

import { AlertModule } from './shared/components/alert/alert.module';
import { AuthModule } from './auth/auth.module';
import { SidebarMenuModule } from './shared/components/sidebar-menu/sidebar-menu.module';

import { AuthTokenInterceptor } from './auth/interceptor/auth-token.interceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AlertModule,
    SidebarMenuModule,
    HttpClientModule,
    AuthModule.forRoot(),
    FontAwesomeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
