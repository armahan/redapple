import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpResponse,
  HttpUserEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, switchMap, finalize, filter, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { throwError, BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  isRefreshingToken: boolean = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  intercept(request: HttpRequest<any>, next: HttpHandler) : Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any> | any> {
    // if access token is null
    if(!this.authService.getToken()){
      return next.handle(request);
    }
    // sending the request only for the refresh token and the logout refresh token endpoints
    if(request.url.endsWith('refresh') || request.url.endsWith('logout/refresh')){
      return next.handle(request);
    }
    return next.handle(this.addTokenToRequest(request, this.authService.getToken()))
      .pipe(
        catchError(err => {
          if (err instanceof HttpErrorResponse) {
            switch ((<HttpErrorResponse>err).status) {
              case 401:
                return this.handle401Error(request, next);
              case 400:
                return <any>this.authService.logOut();
              case 422:
                return <any>this.authService.logOut();
            }
          } else {
            return throwError(err);
          }
        }));
  }

  private addTokenToRequest(request: HttpRequest<any>, token: string) : HttpRequest<any> {
    return request.clone({ setHeaders: { Authorization: `Bearer ${token}`}});
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
 
    if(!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      this.tokenSubject.next(null);
 
      return this.authService.refreshToken()
        .pipe(
          switchMap((user: any) => {
            if(user) {
              this.tokenSubject.next(user.access_token);;
              this.authService.setToken(user.access_token)
              return next.handle(this.addTokenToRequest(request, user.access_token));
            }
            return <any>this.authService.logOut();
          }),
          catchError(err => {
            return <any>this.authService.logOut();
          }),
          finalize(() => {
            this.isRefreshingToken = false;
          })
        );
    } else {
      this.isRefreshingToken = false;
 
      return this.tokenSubject
        .pipe(filter(token => token != null),
          take(1),
          switchMap(token => {
          return next.handle(this.addTokenToRequest(request, token));
        }));
    }}
}
