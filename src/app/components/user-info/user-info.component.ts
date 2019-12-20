import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  constructor(private router: Router) { }

  private token = sessionStorage.getItem("token");

  ngOnInit() {
    if (sessionStorage.getItem("token")) {
      console.log("token", this.token);
    } else {
      // if there is no token in the sessionStorage then navigate to the login view.
      this.router.navigate(["login"]);
      console.log("no token");
    }
  }

  // used to clear the session storage.
  clear() {
    sessionStorage.clear();
    this.router.navigate(["login"]);
  }

}
