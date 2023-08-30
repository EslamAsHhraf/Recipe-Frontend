import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  username: any='';
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.getMe().subscribe({
      next: (res: any) => {
        console.log("res");
        console.log(res);
          this.username = res?.name;
      },
      error: (err) => {
        // put error message
        console.log(err);
      },
    });
  }
}
