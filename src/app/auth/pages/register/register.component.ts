import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { PasswordValidation } from './password-validation';
import { AuthService } from 'src/app/core';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  authLevel = 3;
  isLoggedIn: Boolean = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      confirmPassword: new FormControl('', [Validators.required])
    },
    {
      validators: PasswordValidation.MatchPassword
    }
    );
    this.isLoggedIn = this.authService.isAuthenticated()
  }
  onSubmit() {
    this.authService.register(this.registerForm.value.userName, this.registerForm.value.email, this.registerForm.value.password, this.authLevel).subscribe(resdata=>{
      console.log(resdata)
      this.registerForm.reset()
    })
  }
}
