import { Component, OnInit } from '@angular/core';

import { UserService, Users, AuthService, User } from 'src/app/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private userService: UserService, private authService: AuthService) { }
  userList : Users;

  ngOnInit() {
    if(this.authService.getToken()){
      this.getUsers()
    }
    
  }
  getUsers(){
    this.userService.getUsers().subscribe(responseData=>{
      this.userList = responseData
    });
  }
}
