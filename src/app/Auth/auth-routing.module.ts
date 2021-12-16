import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { VerifyComponent } from './verify/verify.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',

    children: [

      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',           
        component: SignupComponent 
      },
      { 
        path: 'login',
        component: LoginComponent 
      },
      { 
        path: 'verify-token/:id',     
        component: VerifyComponent 
      },
      {
        path: 'reset-password/:id',
        component: ResetPasswordComponent
      }
  
    ],
  }
]    

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    BrowserModule
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
