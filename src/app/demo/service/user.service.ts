import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) {}
    getUser(id :number) {
        return this.http.get(this.baseUrl + '/auth/' + id, {
            withCredentials: true,
        });
    }

}
