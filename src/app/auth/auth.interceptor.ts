import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router,
    private cookieService: CookieService) {
  }

  // Automatic include token in all http calls
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('token') != null) {
      const clonedReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + this.cookieService.get('session-token'))
      });
      return next.handle(clonedReq).pipe(
        tap(
          succ => {
          },
          err => {
            if (err.status === 401) {
              // this.authenticationService.token = "";
              // this.router.navigateByUrl('/login');
            } else if (err.status === 403) {
              // this.router.navigateByUrl('/forbidden');
            } else {
            }
          }
        )
      )
    } else
      return next.handle(req.clone());
  }
}
