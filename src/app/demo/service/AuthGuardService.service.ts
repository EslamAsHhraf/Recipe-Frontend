import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ProfileService } from './profile.service';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthGuardService {
    constructor(private authService: ProfileService, private router: Router) {}

    canActivate: CanActivateFn = (route, state) => {
        return this.authService.getMe().pipe(
            map((res: any) => {
                console.log(res);
                if (res.status == '401') {
                    this.router.navigate(['/auth/login']);
                    return false;
                } else {
                    return true;
                }
            }),
            catchError((error) => {
                console.error('An error occurred:', error);
                this.router.navigate(['/auth/login']);
                return of(false); // Return a boolean indicating failure
            })
        );
    };
}
