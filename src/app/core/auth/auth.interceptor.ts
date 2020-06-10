import {UserService} from '../../shared/services/user.service';

﻿import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {CookieService} from 'ngx-cookie-service';
import {JwtToken} from '../../shared/models/jwtToken';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router,
              private cookieService: CookieService, private userService: UserService) {
  }

  // Automatic include token in all https calls
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check if JWT is set
    if (this.cookieService.get('session-token') !== undefined && this.cookieService.get('session-token') !== '' && this.cookieService.get('session-token') !== 'undefined') {
      const jwtToken = this.cookieService.get('session-token');
      // Check if token needs to be renewed
      this.renewJwtToken(jwtToken);
      // Add token to header
      const clonedReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + jwtToken)
      });
      // Clone https request so header is added
      return next.handle(clonedReq).pipe(
        tap(
          () => {
          },
          err => {
            if (err.status === 401) {
              // If token is expired or user tried to manipulate with token remove it from cookie and redirect to home page.
              this.cookieService.delete('session-token', '/');
              this.router.navigateByUrl('');
            }
          }
        )
      );
    } else {
      // Normally send https request
      return next.handle(req.clone());
    }
  }

  // Renew JWT
  renewJwtToken(jwtToken) {
    // Split JWT to get payload
    const slitted = jwtToken.split('.');
    // 0 is Header
    // 1 is payload
    // 2 is verify signature
    // base64 decode payload and put in JwtToken
    const jwt: JwtToken = JSON.parse(atob(slitted[1]));
    const currentDatetime = new Date();
    const expiresDatetime = new Date(jwt.Expires);
    const difference = this.convertMilliToHours((expiresDatetime.getTime() - currentDatetime.getTime()));
    // Check if difference token expires before 3 hours
    if (difference < 3) {
      this.userService.Renew(jwt.AccountId)
        .subscribe(success => {
          // Update session-token
          this.cookieService.set('session-token', success.token, 1, '/');
        });
    }
  }

  // Convert milliseconds to hours
  convertMilliToHours(time) {
    return time / 1000 / 60 / 60;
  }
}
