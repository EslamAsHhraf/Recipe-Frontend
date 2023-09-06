import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/demo/service/authentication.service';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {PasswordStrict} from 'src/app/demo/service/passwordStrict.service'
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
            .error {
                color: red;
            }
            .success {
                color: green;
                font-weight: bold;
            }
        `,
    ],
})
export class RegisterComponent {
    error: boolean[] = [false, false, false, false];
    user: User = {
        username: '',
        password: '',
    };
    confirmPassword: string = '';
    feedbackArr;
    errorMessage:string='';
    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        public layoutService: LayoutService,
        private passwordStrict:PasswordStrict
    ) {}
    ngOnInit() {
        this.feedbackArr = this.passwordStrict.data();
  }
    onSubmit() {
        this.error[0] = this.user.username == '' ? true : false;
        this.error[1] = this.user.password == '' ? true : false;
        this.error[2] =
            this.user.password != this.confirmPassword ? true : false;
        if (this.feedbackArr.some((item) => item.status === false)) {
            this.error[1] = true;
        }
        if (!this.error.some((item) => item === true)) {
            this.authenticationService.registerUser(this.user).subscribe({
                next: () => {
                    this.errorMessage='';
                    this.router.navigate(['./auth/login']);
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
    checkPasswordStrength() {
        this.feedbackArr[0].status =
            this.user.password.length >= 8 ? true : false;
        this.feedbackArr[1].status = /[A-Z]/.test(this.user.password)
            ? true
            : false;
        this.feedbackArr[2].status = /[a-zs]/.test(this.user.password)
            ? true
            : false;
        this.feedbackArr[3].status = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(
            this.user.password
        )
            ? true
            : false;
        this.feedbackArr[4].status = /\d/.test(
            this.user.password
        )
            ? true
            : false;
    }
}
