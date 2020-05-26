import {CookieService} from 'ngx-cookie-service';
import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {UserService} from '../../shared/services/user.service';
import {LoginFormComponent} from '../../modules/login-form/login-form.component';
import {SignupFormComponent} from '../../modules/signup-form/signup-form.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('loginContent') loginContent: TemplateRef<any>;
  dialogRef;


  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private userService: UserService,
    public cookieService: CookieService,
    private toastr: ToastrService
  ) {
  }

  login() {
    this.dialogRef = this.dialog.open(LoginFormComponent);
  }

  create() {
    this.dialogRef = this.dialog.open(SignupFormComponent);
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
  }

  logout() {
    this.cookieService.delete('session-token', '/');
  }
}
