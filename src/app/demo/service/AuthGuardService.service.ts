import { Injectable, inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthGuardService {
    constructor(private authService: AuthenticationService) {}

    canActivate: CanActivateFn = (route, state) => {
        return this.authService.getMe().pipe(
            map((res: any) => {
                if (res.status == '401') {
                    return false;
                } else {
                    return true;
                }
            })
        );
    };
}
