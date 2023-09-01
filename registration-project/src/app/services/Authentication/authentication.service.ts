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
      .set('Accept', '*/*'),
    withCredentials: true,
  };
  constructor(private http: HttpClient, private cookieService: CookieService) {}
  registerUser(user: User) {
    return this.http.post(this.baseUrl + '/Auth/register', user);
  }
  koko() {
    return this.http.get(this.baseUrl + '/Auth/koko', {
      withCredentials: true,
    });
  }
  loginUser(user: User) {
    return this.http.post(this.baseUrl + '/Auth/login', user);
  }

  getMe() {
    //  axios.defaults.headers.common['Cookie'] =
    //    'token=' + this.cookieService.get('token');
    //  axios.defaults.headers.common['Content-type'] =
    //    'application/x-www-form-urlencoded';

    //  const header = new HttpHeaders().set(
    //    'Cookie',
    //    'token=' + this.cookieService.get('token')
    //  );
    //  return axios.create({ withCredentials: true }).get(this.baseUrl + '/Auth');
    const header = new HttpHeaders().set('-type', 'token=');
    return this.http.get(this.baseUrl + '/Auth', { withCredentials:true });
  }
}
