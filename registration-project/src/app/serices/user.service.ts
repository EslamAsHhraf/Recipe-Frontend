import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "Auth";
  private url2 = "Auth/register";
  private url3 = "Auth/login";
  constructor(private http:HttpClient) { }
  public GetName() : Observable<User[]>{
    
    return this.http.get<User[]>(`${environment.apiUrl}/${this.url}`);

  }
  public Register(user:User) : Observable<User[]>{
    
    return this.http.post<User[]>(`${environment.apiUrl}/${this.url2}`,user);

  }
  public Login(user:User) : Observable<User[]>{
    
    return this.http.post<User[]>(`${environment.apiUrl}/${this.url3}`,user);

  }
}
