import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/demo/service/authentication.service';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
            :host ::ng-deep .error {
                color: red;
            }
            :host ::ng-deep .hero {
                height: 100vh;
                margin: 0px;
                background: linear-gradient(
                        rgba(15, 23, 43, 0.9),
                        rgba(15, 23, 43, 0.9)
                    ),
                    url('../../../../../assets/Images/bg-hero.jpg');
                background-position: center center;
                background-repeat: no-repeat;
                background-size: cover;
            }
            img {
                width: 50%;
                max-width: 100%;
                height: auto;
                -webkit-animation: spin 35s linear infinite;
                -moz-animation: spin 35s linear infinite;
                animation: spin 35s linear infinite;
            }

            @media (max-width: 1170px) {
                .small-screen {
                    display: none;
                }
            }
        `,
    ],
})
export class LoginComponent {
    valCheck: string[] = ['remember'];
    error: boolean[] = [false, false];
    user: User = {
        username: '',
        password: '',
    };
    errorMessage: string = '';

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        public layoutService: LayoutService
    ) {}

    onSubmit() {
        this.error[0] = this.user.username == '' ? true : false;
        this.error[1] = this.user.password == '' ? true : false;
        if (!this.error.some((item) => item === true)) {
            this.authenticationService.loginUser(this.user).subscribe({
                next: () => {
                    this.router.navigate(['/']);
                    this.errorMessage = '';
                },
                error: (err) => {
                    // put error message
                    console.log(err);
                    this.errorMessage =
                        'title' in err.error.data
                            ? err?.error.data?.title
                            : 'Error, Can you try again after 5 Minutes';
                },
            });
        }
    }
}

