import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {CookieService} from 'ngx-cookie-service';
import {JwtToken} from '../models/jwtToken';
import {UserService} from '../services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router,
              private cookieService: CookieService, private userService: UserService) {
  }

  // Automatic include token in all http calls
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.cookieService.get('session-token') !== undefined && this.cookieService.get('session-token') !== '') {
      const jwtToken = this.cookieService.get('session-token');
      this.renewJwtToken(jwtToken);
      const clonedReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + jwtToken)
      });
      return next.handle(clonedReq).pipe(
        tap(
          succ => {
          },
          err => {
            if (err.status === 401) {
              this.cookieService.delete('session-token');
              this.router.navigateByUrl('');
            }
          }
        )
      );
    } else {
      return next.handle(req.clone());
    }
  }

  renewJwtToken(jwtToken) {
    // Split token to get payload
    const slitted = jwtToken.split('.');
    const jwt: JwtToken = JSON.parse(atob(slitted[1]));

    const currentDatetime = new Date();
    const expiresDatetime = new Date(jwt.Expires);
    const difference = this.convertMilliToHours((expiresDatetime.getTime() - currentDatetime.getTime()));
    // Check if difference token expires before 3 hours
    if (difference < 3) {
      this.userService.Renew(jwt.EmployeeId)
        .subscribe(success => {
            this.cookieService.set('session-token', success.token);
          },
          err => {
            console.log(err);
          });
    }
  }

  // Convert milliseconds to hours
  convertMilliToHours(time) {
    return time / 1000 / 60 / 60;
  }
}
