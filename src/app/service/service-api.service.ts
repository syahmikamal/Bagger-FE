import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ServiceApiService {

  uri = environment.apiURL;

  constructor(
    private http: HttpClient,
  ) { }

  viewListPost() {
    return this.http.get(`${this.uri}/get/view-list-post`)
  }
}
