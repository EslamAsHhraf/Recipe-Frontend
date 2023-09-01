import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-components-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  user: User = {
    username: '',
    password: '',
  };
  token: any;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private alertify: AlertifyService,
    private router: Router,
    private cookieService: CookieService,
  ) {}

  ngOnInit() {
    this.createloginForm();
  }
  createloginForm() {
    this.loginForm = this.fb.group({
      userName: [null, Validators.required],
      password: [null, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authenticationService.loginUser(this.user).subscribe({
        next: (res: any) => {
          console.log(this.cookieService.get('token'));
          const helper = new JwtHelperService();
          console.log(
            helper.decodeToken(res?.token)[
              'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
            ]
          );
          // this.cookieService.set('token', res.token);

          this.router.navigate(['/']);
          this.alertify.success('Congrats, you are successfully logined');
        },
        error: (err) => {
          // put error message
          console.log(err);
          this.alertify.error(err?.error?.Title[0]);
        },
      });
    } else {
      this.alertify.error('Kindly provide the required fields');
    }
    this.authenticationService.koko().subscribe({
      next: () => {

      },
      error: () => {

      },
    });
  }
}
