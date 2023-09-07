import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { PasswordStrict } from 'src/app/demo/service/passwordStrict.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-changePassword',
    templateUrl: './changePassword.component.html',
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
    providers: [MessageService],
})
export class ChangePasswordComponent implements OnInit {
    error: boolean[] = [false, false, false, false];
    confirmPassword: string = '';
    password: string = '';
    oldPassword: string = '';
    feedbackArr;
    errorMessage: string = '';
    constructor(
        private profileService: ProfileService,
        private passwordStrict: PasswordStrict,
        private router: Router,
        private messageService: MessageService,
    ) {}

    ngOnInit() {
        this.feedbackArr = this.passwordStrict.data();
    }
    onSubmit() {
        this.errorMessage = '';
        this.error[0] = this.oldPassword == '' ? true : false;
        this.error[1] = this.password == '' ? true : false;
        this.error[2] = this.password != this.confirmPassword ? true : false;
        if (this.feedbackArr.some((item) => item.status === false)) {
            this.error[1] = true;
        }
        if (!this.error.some((item) => item === true)) {
            this.profileService
                .changePassword(this.oldPassword, this.password)
                .subscribe({
                    next: () => {
                        this.errorMessage = '';
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Change Password Successfully',
                            life: 3000,
                        });
                        setTimeout(() => {
                            this.router.navigate(['/']);
                        }, 3000); // 3000 milliseconds (3 seconds)
                    },
                    error: (err) => {
                        // put error message
                        if (err.status == 401) {
                            this.router.navigate(['./auth/login']);
                        } else {
                            console.log(err);
                            this.errorMessage =
                                'title' in err.error.data
                                    ? err?.error.data?.title
                                    : 'Error, Can you try again after 5 Minutes';
                        }
                    },
                });
        }
    }
    checkPasswordStrength() {
        this.feedbackArr[0].status = this.password.length >= 8 ? true : false;
        this.feedbackArr[1].status = /[A-Z]/.test(this.password) ? true : false;
        this.feedbackArr[2].status = /[a-zs]/.test(this.password)
            ? true
            : false;
        this.feedbackArr[3].status = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(
            this.password
        )
            ? true
            : false;
        this.feedbackArr[4].status = /\d/.test(this.password) ? true : false;
    }
}
