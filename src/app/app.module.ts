import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { AuthRoutingModule } from './Auth/auth-routing.module';

import { AppComponent } from './app.component';
import { SignupComponent } from './Auth/signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { AuthService } from './service/auth.service';

import { HomeModule } from './home/home.module';
import { LoginComponent } from './Auth/login/login.component';
import { VerifyComponent } from './Auth/verify/verify.component';
import { ResetPasswordComponent } from './Auth/reset-password/reset-password.component';
import { CoverComponent } from './cover/cover.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LandingComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    VerifyComponent,
    ResetPasswordComponent,
    CoverComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    HomeModule,
    HttpClientModule,
    AuthRoutingModule,
    NgxSpinnerModule
  ],
  providers: [
    AuthService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
