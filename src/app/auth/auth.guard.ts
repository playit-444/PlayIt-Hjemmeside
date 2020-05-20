import { MatDialog } from '@angular/material/dialog';
import {CookieService} from 'ngx-cookie-service';

﻿import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { LoginFormComponent } from '../login-form/login-form.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private cookieService: CookieService,
    private dialog: MatDialog,) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (!this.cookieService.check('session-token')) {
      this.dialog.open(LoginFormComponent);
      this.router.navigate(['']);
    }
    return true;

    // console.log(next.routeConfig.path);
  }
}
