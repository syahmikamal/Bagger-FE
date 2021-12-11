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
}
