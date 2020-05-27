import {MatDialog} from '@angular/material/dialog';
import {SignupFormComponent} from '../signup-form/signup-form.component';
import {CookieService} from 'ngx-cookie-service';
import {Component, OnInit} from '@angular/core';
import {faUser, faKey} from '@fortawesome/free-solid-svg-icons';
import {FormGroup, FormBuilder} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {MatDialogRef} from '@angular/material/dialog';
import {UserService} from '../../shared/services/user.service';
import {IpServiceService} from '../../shared/services/ip-service.service';
import {User} from '../../shared/models/user';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  faUser = faUser;
  faKey = faKey;
  loginForm: FormGroup;
  ipv4;

  constructor(
    private userService: UserService,
    private ipServiceService: IpServiceService,
    private fb: FormBuilder,
    private cookieService: CookieService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<LoginFormComponent>,
    private signUpForm: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: [''],
      email: [''],
      password: [''],
      ipv4: ['']
    });

    this.ipServiceService.getIPAddress()
      .subscribe(success => {
          this.ipv4 = success;
          // this.ipv4 = success.ip;
        },
        err => {
          this.toastr.error('AdBlock er ikke tilladt på denne side', 'Der skete en fejl!');
        });
  }

  create() {
    this.signUpForm.open(SignupFormComponent);
    this.dialogRef.close();
  }

  Login() {
    const user: User = {
      userName: this.loginForm.value.userName,
      password: this.loginForm.value.password,
      ipv4: this.ipv4
    };

    this.userService.Login(user)
      .subscribe(success => {
          this.toastr.success('Du er nu logget ind', 'Succes!');
          this.cookieService.set('session-token', success.jwtToken, 1,'/');
          this.dialogRef.close();
        },
        err => {
          this.toastr.error(err.error, 'Der skete en fejl!');
        });
  }
}
