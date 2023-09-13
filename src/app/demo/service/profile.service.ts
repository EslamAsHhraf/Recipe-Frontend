import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { User } from 'src/app/model/user';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProfileService {
    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) {}

    getMe() {
        return this.http.get(this.baseUrl + '/auth/me', { withCredentials: true });
    }
    logout() {
        return this.http.get(this.baseUrl + '/Auth/logout', {
            withCredentials: true,
        });
    }
    uploadImage(ImageFile) {
        return this.http.put(this.baseUrl + '/Auth/UpdateImage', ImageFile, {
            withCredentials: true,
        });
    }
    changePassword(oldPassword, newPassword) {
        return this.http.put(
            this.baseUrl +
            '/Auth/ChangePassword?oldPassword=' +
            oldPassword + '&newPassword=' + newPassword,null,{
                withCredentials: true,
            });
    }
}
