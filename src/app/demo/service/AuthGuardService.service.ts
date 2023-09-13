import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ProfileService } from './profile.service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthGuardService {
    constructor(private authService: ProfileService, private router: Router) {}

    canActivate: CanActivateFn = (route, state) => {
        return this.authService.getMe().pipe(
            map((res: any) => {
                if (res.status == '401') {
                    this.router.navigate(['/auth/login']);
                    console.log('auth');
                    return false;
                } else {
                    return true;
                }
            })
        );
    };
}
