import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Users, User } from '../models';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private redAppleUrl = 'http://localhost:5000/api/v0.1/'; //URL to web api.

  constructor(private http: HttpClient) { }

  getUser(userId: number){
    return this.http.get<User>(this.redAppleUrl + 'user/' + userId);
  }

  updateUser(userId: number, userName: string, email: string, authLevel: number, password?: string){
    return this.http.put<User>(this.redAppleUrl + 'user/' + userId, {
      user_name: userName,
      email: email,
      password: password,
      auth_level: authLevel
    });
  }

  getUsers(){
    return this.http.get<Users>(this.redAppleUrl + 'users');
  }
}
