import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { User } from 'src/app/model/user';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) {}

    getall() {
        return this.http.get(this.baseUrl + '/category', {
            withCredentials: true,
        });
    }


}
