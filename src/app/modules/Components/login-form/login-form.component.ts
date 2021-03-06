import {MatDialog} from '@angular/material/dialog';
import {SignupFormComponent} from '../signup-form/signup-form.component';
import {CookieService} from 'ngx-cookie-service';
import {Component, OnInit} from '@angular/core';
import {faUser, faKey} from '@fortawesome/free-solid-svg-icons';
import {FormGroup, FormBuilder} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {MatDialogRef} from '@angular/material/dialog';
import {UserService} from '../../../shared/services/user.service';
import {IpServiceService} from '../../../shared/services/ip-service.service';
import {User} from '../../../shared/models/user';
import {Router} from '@angular/router';

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
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: [''],
      email: [''],
      password: [''],
      ipv4: ['']
    });

    // Get Ipv4 address for the logged in user
    this.ipServiceService.getIPAddress()
      .subscribe(success => {
          this.ipv4 = success;
        },
        err => {
          this.toastr.error('AdBlock er ikke tilladt på denne side', 'Der skete en fejl!');
        });
  }

  // Open Signup component
  create() {
    this.signUpForm.open(SignupFormComponent);
    this.dialogRef.close();
  }

  // Login User
  Login() {
    const user: User = {
      userName: this.loginForm.value.userName,
      password: this.loginForm.value.password,
      ipv4: this.ipv4
    };

    this.userService.Login(user)
      .subscribe(success => {
          this.toastr.success('Du er nu logget ind', 'Succes!');
          // Set cookie for user with jwt
          this.cookieService.set('session-token', success.jwtToken, 1, '/');
          // Update observable
          this.userService.SetLoggedIn(true);
          this.dialogRef.close();
          this.router.navigate(['']);
        },
        err => {
          this.toastr.error(err.error, 'Der skete en fejl!');
        });
  }
}
