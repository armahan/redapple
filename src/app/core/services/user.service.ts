import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private redAppleUrl = 'http://localhost:5000/'; //URL to web api.

  constructor(private http: HttpClient) { }

  getUser(userId: number): Observable<User> {
    return this.http.get<User>(this.redAppleUrl + 'user/' + userId);
  }

  updateUser(userId: number, userName: string, email: string, password: string, authLevel: number): Observable<User> {
    return this.http.put<User>(this.redAppleUrl + 'user/' + userId, {
      user_name: userName,
      email: email,
      password: password,
      auth_level: authLevel
    });
  }
}
