import {LoginFormComponent} from '../../modules/Components/login-form/login-form.component';

﻿import {MatDialog} from '@angular/material/dialog';
import {CookieService} from 'ngx-cookie-service';

﻿import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
// is responsible for handle authentication on all endpoints.
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private cookieService: CookieService,
              private dialog: MatDialog,) {
  }

  // Check if user have access to the specific endpoint else send them to home page.
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    // Check if user is not logged in
    if (!this.cookieService.check('session-token')) {
      // Open Login formula
      this.dialog.open(LoginFormComponent);
      // Navigate to home page
      this.router.navigate(['']);
      return false;
    }

    // Check if request path is lobby and the cookie inlobby is not set or Check if request path is ingame and the coockie ingame is not set
    if (window.location.pathname === '/game/lobby' && !this.cookieService.check('inlobby')
      || window.location.pathname === '/game/ingame' && !this.cookieService.check('ingame')) {
      // Delete all game related cookies
      this.cookieService.delete('inlobby');
      this.cookieService.delete('ingame');
      // Navigate to home page
      this.router.navigate(['']);
      return false;
    }

    return true;
  }

  // Check if user can change page
  canDeactivate(): boolean {
    // Confirm if user want to change page
    return confirm('Du er ved at forlade spillet, er du sikker på at du vil forlade?');
  }
}
