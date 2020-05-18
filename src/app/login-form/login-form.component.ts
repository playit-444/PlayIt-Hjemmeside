import { Component, OnInit, Input } from '@angular/core';
import { faUser, faAt, faKey } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import {map} from "rxjs/operators";
import { User } from '../models/user';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { IpServiceService } from '../services/ip-service.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  faUser = faUser;
  faKey = faKey;
  @Input() modal;
  loginForm: FormGroup;

  constructor(private customerService: UserService, private ipServiceService: IpServiceService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      userName: [''],
      email: [''],
      password:[''],
      ipv4:['']
    });
  }

  Login() {
    let iPv4;
    this.ipServiceService.getIPAddress().subscribe((res:any)=>{
      iPv4=res.ip;
      this.MakeHttpRequest(iPv4);
    });
  }

  MakeHttpRequest(iPv4) {

    let user: User = {
      userName: this.loginForm.value.userName,
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      ipv4: iPv4
    }

    this.customerService.Login(user)
    .subscribe(success => {
      this.modal.close();
    },
      err => {
        console.log(err);
      });
  }

}
