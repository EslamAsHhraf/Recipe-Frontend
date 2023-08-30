import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';
import { Router } from '@angular/router';

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
  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private alertify: AlertifyService,
    private router: Router
    ) {}

  ngOnInit() {
    this.createloginForm();
  }
  createloginForm() {
    this.loginForm = this.fb.group(
      {
        userName: [null, Validators.required],
        password: [null, [Validators.required]],
      },
    );
  }

  onSubmit() {
    console.log("test")
    console.log(this.loginForm)
    if (this.loginForm.valid) {
      console.log("test2")
      this.authenticationService.loginUser(this.user).subscribe({
        next: (res) => {
          console.log("success")
          this.router.navigate(['/']);
          this.alertify.success('Congrats, you are successfully logined');
        },
        error: (err) => {
          // put error message
          // this.alertify.error(err?.error?.Title[0]);
          console.log(err);
        },
      });
    } else {
      this.alertify.error('Kindly provide the required fields');
    }
  }
}
