import { Component,OnInit, Input ,Output , EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user.';
import { UserService } from 'src/app/serices/user.service';

@Component({
  selector: 'app-components-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {
  @Input() user?: User;

  constructor(private userService:UserService) {}

  ngOnInit() {}
  getName(user:User){
    this.userService
    .GetName();
  }
  LoginUser(user:User){
    this.userService
    .Login(user);
  }

}
