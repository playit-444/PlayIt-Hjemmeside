import {LoginFormComponent} from '../../modules/Components/login-form/login-form.component';

﻿import {MatDialog} from '@angular/material/dialog';
import {CookieService} from 'ngx-cookie-service';

﻿import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';

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
      return false;
    }

    if (window.location.pathname === "/game/lobby" && !this.cookieService.check('inlobby')) {
      this.cookieService.delete('inlobby');
      this.cookieService.delete('ingame');
      this.router.navigate(['']);
      return false;
    }

    if (window.location.pathname === "/game/ingame" && !this.cookieService.check('ingame')) {
      this.cookieService.delete('inlobby');
      this.cookieService.delete('ingame');
      this.router.navigate(['']);
      return false;
    }

    return true;
  }

  canDeactivate(): boolean {
    return confirm('Du er ved at forlade spillet, er du sikker på at du vil forlade?');
  }


}
