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
  loggedUser : User;
  ngOnInit() {
    if(this.authService.getToken()){
      this.getUsers()
      this.loggedUser = this.authService.getUser()
    }
    
  }
  getUsers(){
    this.userService.getUsers().subscribe(responseData=>{
      this.userList = responseData
    });
  }
  changeAuthority(user, deviceValue) {
    user.auth_level = deviceValue
    this.userService.updateUser(user.user_id, user.user_name, user.email, user.auth_level).subscribe(responseData=>{
      console.log(responseData)
    });
}
}
