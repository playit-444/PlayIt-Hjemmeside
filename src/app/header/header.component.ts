import {SignupFormComponent} from './../signup-form/signup-form.component';
import {CookieService} from 'ngx-cookie-service';
import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../services/user.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {LoginFormComponent} from '../login-form/login-form.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  closeResult = '';
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
    this.dialogRef.afterClosed().subscribe(result => {
    })
  }

  create() {
    this.dialogRef = this.dialog.open(SignupFormComponent);
    this.dialogRef.afterClosed().subscribe(result => {
    })
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
    this.cookieService.delete('session-token');
  }
}
