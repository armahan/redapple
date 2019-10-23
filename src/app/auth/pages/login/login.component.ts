import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { AuthService } from 'src/app/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  isLoggedIn: Boolean = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if(this.authService.getToken()){
      this.isLoggedIn = this.authService.isAuthenticated()
    }
    this.loginForm = new FormGroup({
      email : new FormControl('',[Validators.required, Validators.minLength(4)]),
      password: new FormControl('',[Validators.required, Validators.minLength(4)])
    })
  }
  
  onSubmit(){
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(responseData=>{
      localStorage.setItem('access_token', responseData.access_token)
      localStorage.setItem('refresh_token', responseData.refresh_token)
      window.location.reload();
    })
    this.router.navigateByUrl('/home')
  }
  
}
