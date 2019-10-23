import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: Boolean = false;
  userName : string;
  userRole : string;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
   if(this.authService.getToken()){
    this.isLoggedIn = this.authService.isAuthenticated()
    this.userName = this.authService.getUsername()
    this.userRole = this.authService.getUserType()
   }
  }

  logOut() {
    this.isLoggedIn = !this.isLoggedIn;
    this.authService.logOut();
  }

}
