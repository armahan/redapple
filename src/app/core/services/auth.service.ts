import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

import { User } from '../models/user';
import { map } from 'rxjs/operators';

class RefreshResponse {
  access_token: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
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
    this.removeToken();
    this.removeRefreshToken();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    var token = this.getToken()
    var decoded = jwt_decode(token)
    //new Date(decoded.exp * 1000).getTime()
    return decoded.identity['user_name'] !== null && this.isExpired()
  }

  isExpired(): boolean {
    var token = this.getToken()
    var decoded = jwt_decode(token)
    var isExpired = new Date().getTime() >= decoded.exp
    return isExpired
  }

  isExpiredRefresh(): boolean {
    var token = this.getRefreshToken()
    var decoded = jwt_decode(token)
    var isExpired = new Date().getTime() >= decoded.exp
    return isExpired
  }

  refreshToken(){
    let refreshToken = this.getRefreshToken();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + `${refreshToken}`});
    let opts = { headers: headers };
    return this.httpService.post<any>(this.redAppleUrl + 'refresh', 'body', opts)
    .pipe(
      map(token=>{
        if(token && token.access_token){
          this.setToken(token.access_token)
        }
        return <any>token;
      })
    );

  }

  getUsername() {
    var token = this.getToken()
    var decoded = jwt_decode(token)
    return decoded.identity['user_name']
  }
  getUserType(){
    var token = this.getToken()
    var decoded = jwt_decode(token)
    return decoded.user_claims['role']
  }
  getToken() {
    return localStorage.getItem('access_token')
  }
  getRefreshToken() {
    return localStorage.getItem('refresh_token')
  }

  removeToken() {
    return localStorage.removeItem('access_token')
  }
  removeRefreshToken() {
    return localStorage.removeItem('refresh_token')
  }

  setToken(token) {
    return localStorage.setItem('access_token', token)
  }
  setRefreshToken(token) {
    return localStorage.setItem('refresh_token', token)
  }
}
