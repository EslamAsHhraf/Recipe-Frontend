import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { User } from 'src/app/model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}
  registerUser(user: User) {
    return this.http.post(this.baseUrl + '/Auth/register', user);
  }
}
