import { Component } from '@angular/core';
import { User } from 'src/app/model/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-components-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  registrationForm!: FormGroup;
  user: User = {
    username: '',
    password: '',
  };
  confirmPassword: string = '';

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private alertify: AlertifyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createRegisterationForm();
  }

  createRegisterationForm() {
    this.registrationForm = this.fb.group(
      {
        userName: [null, Validators.required],
        password: [null, [Validators.required]],
        confirmPassword: [null, Validators.required],
      },
      { validators: this.passwordMatchingValidator }
    );
  }
  passwordMatchingValidator(fg: FormGroup): Validators | null {
    return fg.get('password')?.value === fg.get('confirmPassword')?.value
      ? null
      : { notmatched: true };
  }
  onSubmit() {
    if (this.registrationForm.valid) {
      this.authenticationService.registerUser(this.user).subscribe({
        next: (res) => {
          this.router.navigate(['/login']);
          this.alertify.success('Congrats, you are successfully registered');
        },
        error: (err) => {
          // put error message
          this.alertify.error(err?.error?.Title[0]);
          console.log(err);
        },
      });
    } else {
      if (this.registrationForm.errors?.['notmatched']) {
        this.alertify.error(`Confirm Password isn't equal Password`);
      } else {
        this.alertify.error('Kindly provide the required fields');
      }
    }
  }
}
