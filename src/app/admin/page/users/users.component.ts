import { Component, OnInit } from '@angular/core';

import { UserService, Users } from 'src/app/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private userService: UserService ) { }

  userList : Users;

  ngOnInit() {
    this.getUsers()
  }
  getUsers(){
    this.userService.getUsers().subscribe(responseData=>{
      this.userList = responseData
    });
  }
}
