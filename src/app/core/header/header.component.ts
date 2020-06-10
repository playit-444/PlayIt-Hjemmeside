import {PlayerInfo} from '../../shared/models/playerInfo';
import {CookieService} from 'ngx-cookie-service';
import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {UserService} from '../../shared/services/user.service';
import {LoginFormComponent} from '../../modules/Components/login-form/login-form.component';
import {SignupFormComponent} from '../../modules/Components/signup-form/signup-form.component';
import {faChevronDown, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('loginContent') loginContent: TemplateRef<any>;
  dialogRef;
  user: PlayerInfo;
  faChevronDown = faChevronDown;
  faSignOutAlt = faSignOutAlt;


  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private userService: UserService,
    public cookieService: CookieService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.route
      .queryParams
      .subscribe(params => {
        const urlParmToken = params.token;
        // Check if token is not null
        if (urlParmToken != null) {
          // Verify token through api
          this.userService.Verify(urlParmToken)
            .subscribe(() => {
                this.toastr.success('Du er nu blevet verificeret! du kan nu logge ind', 'Succes!');
                this.login();
              },
              err => {
                this.toastr.error(err.error, 'Der skete en fejl!');
              });
        }
      });

    // Check if user is loggedIn
    // Subscribe to observable and wait for the user to login
    this.userService.GetLoggedIn().subscribe(loggedin => {
      if (loggedin)
        if (this.cookieService.check('session-token'))
          this.getUser(this.parseJwt(this.cookieService.get('session-token')).AccountId);
    });

    // Try to login
    if (this.cookieService.check('session-token') && this.user === undefined) {
      this.getUser(this.parseJwt(this.cookieService.get('session-token')).AccountId);
    }
  }

  // Get token information from JWT
  parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    return JSON.parse(atob(base64Url));
  };

  // Get user information
  getUser(accountID: number) {
    this.userService.GetUser(accountID).subscribe(success => {
      this.user = success;
    });
  }

  // Open Login component
  login() {
    this.dialogRef = this.dialog.open(LoginFormComponent);
  }

  // Open Create component
  create() {
    this.dialogRef = this.dialog.open(SignupFormComponent);
  }

  // Open Logout component
  logout() {
    this.cookieService.delete('session-token', '/');
  }
}
