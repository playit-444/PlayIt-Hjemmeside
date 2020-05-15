import { Component, OnInit, Input } from '@angular/core';
import { faUser, faAt, faKey } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import {map} from "rxjs/operators";
import { User } from '../models/user';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  faUser = faUser;
  faKey = faKey;
  @Input() modal;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  Login() {
    this.Test()
    .subscribe(success => {
      console.log(success);
      this.modal.close("test");
    },
      err => {
        console.log(err);
      });
  }

  Test(){

    let user: User = {
      password:"test",
      userName: "Test",
      email: "test",
      ipv4: "123.123.123.123"
    }
    return this.http.post("https://api.444.dk/api/Account/signin", user)
      .pipe(
        map((data: any) => {
return data;
        }));
  }

}
