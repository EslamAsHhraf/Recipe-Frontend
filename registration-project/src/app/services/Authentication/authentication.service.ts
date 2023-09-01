import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/model/user';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  baseUrl = environment.baseUrl;
  token: any;
  private httpOptions = {
    headers: new HttpHeaders()
      .set('Content-Type', 'multipart/form-data'),
      withCredentials: true,

  };
  constructor(private http: HttpClient, private cookieService: CookieService) {}
  registerUser(user: User) {
    return this.http.post(
      this.baseUrl + '/Auth/register',
      user,
    );
  }
  koko() {
    return this.http.get(this.baseUrl + '/Auth/koko', {
      withCredentials: true,
    });
  }
  loginUser(user: User) {

    return this.http.post(this.baseUrl + '/Auth/login', user
    );
  }

  getMe() {
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.get(this.baseUrl + '/Auth', {
      withCredentials: true,
    });
  }
}
