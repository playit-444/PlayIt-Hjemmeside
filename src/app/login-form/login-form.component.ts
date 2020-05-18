import {CookieService} from 'ngx-cookie-service';
import {Component, OnInit, Input} from '@angular/core';
import {faUser, faKey} from '@fortawesome/free-solid-svg-icons';
import {User} from '../models/user';
import {FormGroup, FormBuilder} from '@angular/forms';
import {IpServiceService} from '../services/ip-service.service';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../services/user.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  faUser = faUser;
  faKey = faKey;
  @Input() modal;
  @Input() verified: boolean;
  loginForm: FormGroup;

  constructor(
    private userService: UserService,
    private ipServiceService: IpServiceService,
    private fb: FormBuilder,
    private cookieService: CookieService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    console.log(this.verified);

    this.loginForm = this.fb.group({
      userName: [''],
      email: [''],
      password: [''],
      ipv4: ['']
    });
  }

  Login() {
    let iPv4;
    this.ipServiceService.getIPAddress().subscribe((res: any) => {
      console.log(res);
      iPv4 = res.ip;
      this.MakeHttpRequest(iPv4);
    });
  }

  MakeHttpRequest(iPv4) {

    const user: User = {
      userName: this.loginForm.value.userName,
      password: this.loginForm.value.password,
      ipv4: iPv4
    };

    this.userService.Login(user)
      .subscribe(success => {
          this.toastr.success('Du er nu logget ind', 'Succes!');
          this.cookieService.set('session-token', success.token);
          this.modal.close();
        },
        err => {
          this.toastr.error(err.error, 'Der skete en fejl!');
          console.log(err);
        });
  }
}
