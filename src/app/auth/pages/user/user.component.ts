import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  defaultPassword: string = 'q1w2e3';

  constructor(private userService: UserService, private authService: AuthService) {  }
  

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('current_user'))
    this.isLoggedIn = this.authService.isAuthenticated(localStorage.getItem('access_token'))
    //console.log(this.user.user_id)
    this.createForm()
    this.getUserId()
    
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
      this.setForm(responseData.user_name, responseData.email, this.defaultPassword, responseData.auth_level)
    });
  }
  onSubmit(){
    this.userService.updateUser(this.user.user_id, this.updateForm.value.userName, this.updateForm.value.email, this.updateForm.value.password, this.updateForm.value.authLevel).subscribe(sendData=>{
      console.log(sendData)
    });
  }

}
