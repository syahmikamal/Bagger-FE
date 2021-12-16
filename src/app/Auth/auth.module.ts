import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { VerifyComponent } from './verify/verify.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

import { AuthService } from '../service/auth.service';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    VerifyComponent,,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    RouterModule
  ],
  providers: [
    AuthService,
    CookieService
  ]
})
export class AuthModule { }
