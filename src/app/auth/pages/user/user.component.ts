import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as jwt_decode from 'jwt-decode';

import { UserService, AuthService, User } from 'src/app/core';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  updateForm: FormGroup;
  isLoggedIn: Boolean = false;
  user : User;

  constructor(private userService: UserService, private authService: AuthService) {  }
  

  ngOnInit() {
    this.user = this.getToken(localStorage.getItem('access_token'))
    this.isLoggedIn = this.authService.isAuthenticated()
    //console.log(jwt_decode(localStorage.getItem('access_time')))
    this.createForm()
    this.getUserId()
    
  }
  getToken(token){
    var decoded = jwt_decode(token)
    return decoded['identity']
  }
  createForm(){
    this.updateForm = new FormGroup({
      userName : new FormControl('', Validators.required),
      email : new FormControl('', Validators.required),
      password : new FormControl('', Validators.required),
      authLevel : new FormControl('')
    })
  }
  setForm(user_name:string, email:string, password:string, auth_level:any){
    this.updateForm.patchValue({
      userName: user_name,
      email: email,
      password: password,
      authLevel: auth_level
    });
  }
  getUserId():void{  
    this.userService.getUser(this.user.user_id).subscribe(responseData => {
      this.setForm(responseData.user_name, responseData.email, responseData.password, responseData.auth_level)
    });
  }
  onSubmit(){
    this.userService.updateUser(this.user.user_id, this.updateForm.value.userName, this.updateForm.value.email, this.updateForm.value.password, this.updateForm.value.authLevel).subscribe(sendData=>{
      console.log(sendData)
    });
  }

}
