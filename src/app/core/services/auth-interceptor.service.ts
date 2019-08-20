import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('Interceptor is working')
    if (!!this.authService.getToken()) {
      req = req.clone({
				setHeaders: {
					Authorization: `Bearer ${this.authService.getToken()}`
				}
			});
    }
    return next.handle(req).pipe(tap(null,
      error => {
        if (error.status === 401) {
          this.authService.logOut()
          this.router.navigate(['/login'])
        }
      }))
  }

}
