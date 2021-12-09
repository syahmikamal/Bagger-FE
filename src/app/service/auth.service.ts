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

  signIn(data) {
    return this.http.post(`${this.uri}/auth/sign-in`, data);
  }
}
