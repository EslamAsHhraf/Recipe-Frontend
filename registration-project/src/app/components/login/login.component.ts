import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-components-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {
  username!: string;
  password!: string;
  constructor() {}

  ngOnInit() {}
}
