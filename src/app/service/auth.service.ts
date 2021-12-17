import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  uri = environment.apiURL;

  constructor(
    private http: HttpClient,
  ) { }

  //Authentication
  signIn(data) {
    return this.http.post(`${this.uri}/auth/sign-in`, data);
  }

  signUp(data) {
    return this.http.post(`${this.uri}/auth/sign-up`, data);
  }

  resetEmail(data) {
    return this.http.post(`${this.uri}/auth/reset-email`, data)
  }

  resetPassword(data) {
    return this.http.post(`${this.uri}/auth/reset-password`, data)
  }

  //verify token
  verifyToken(data) {
    return this.http.get(`${this.uri}/auth/verify-token/?verifyToken=${data}`);
  }

  verifyResetToken(data) {
    return this.http.get(`${this.uri}/auth/verify-reset-token/?resetToken=${data}`);
  }
}
