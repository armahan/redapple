import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private userService: UserService ) { }

  ngOnInit() {
    this.getUsers()
  }
  getUsers(){
    this.userService.getUsers().subscribe(responseData=>{
      console.log(responseData)
    });
  }
}
