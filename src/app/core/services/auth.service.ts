import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

import { User } from '../models/user';




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user : User;
  private redAppleUrl = 'http://localhost:5000/'; //URL to web api.

  constructor(private httpService: HttpClient, private router: Router) { }

  register(userName: string, email: string, password: string, authLevel: number) {
    return this.httpService.post<User>(this.redAppleUrl + 'user/register', {
      user_name: userName,
      email: email,
      password: password,
      auth_level: authLevel
    });
  }

  login(email: string, password: string) {
    return this.httpService.post<User>(this.redAppleUrl + 'login', {
      email: email,
      password: password
    });
  }

  logOut() {
    localStorage.removeItem('access_token')
    this.router.navigateByUrl('/home')    
  }

  isAuthenticated(token){
    var decoded = jwt_decode(token)
    if(decoded){
      return decoded
    }
    return false
  }
  getToken(){
    return localStorage.getItem('access_token')
  }
}
