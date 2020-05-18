import {CookieService} from 'ngx-cookie-service';

﻿import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private cookieService: CookieService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      console.log(this.cookieService.check("session-token"));
    if (!this.cookieService.check('session-token')) {
      this.router.navigate(['']);
    }
    return true;

    // console.log(next.routeConfig.path);
  }
}
