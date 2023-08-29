import { Component } from '@angular/core';
import { User } from 'src/app/model/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/services/alertify.service';

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
  ngOnInit() {
    this.createRegisterationForm();
  }
  constructor(private fb: FormBuilder, private alertify: AlertifyService) {}
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
      console.log('Registration form submitted.');
      console.log('Username:', this.user.username);
      console.log('Email:', this.user.password);
      console.log('Confirm Password:', this.confirmPassword);
    } else {
      this.alertify.error('Kindly provide the required fields');
    }
  }
}
