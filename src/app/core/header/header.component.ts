import { PlayerInfo } from '../../shared/models/playerInfo';
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

        if (urlParmToken != null) {
          this.userService.Verify(urlParmToken)
            .subscribe(success => {
                this.toastr.success('Du er nu blevet verificeret! du kan nu logge ind', 'Succes!');
                this.login();
              },
              err => {
                this.toastr.error(err.error, 'Der skete en fejl!');
              });
        }
      });

      if(this.cookieService.check('session-token'))
      {
        this.getUser(this.parseJwt(this.cookieService.get('session-token')).AccountId);
      }
  }

  parseJwt (token: string) {
    const base64Url = token.split('.')[1];
    return JSON.parse(atob(base64Url));
};

  getUser(accountID: number) {
      this.userService.GetUser(accountID).subscribe( success => {
        this.user = success;
      });
  }

  login() {
    this.dialogRef = this.dialog.open(LoginFormComponent);
  }

  create() {
    this.dialogRef = this.dialog.open(SignupFormComponent);
  }

  logout() {
    this.cookieService.delete('session-token', '/');
  }
}
