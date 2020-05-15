import { Component, OnInit, Input } from '@angular/core';
import { faUser, faAt, faKey } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import {map} from "rxjs/operators";
import { User } from '../models/user';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  faUser = faUser;
  faAt = faAt;
  faKey = faKey;
  @Input() modal;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  CreateUser() {
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
      userName: "Test",
      email: "test",
      password:"test"
    }
    return this.http.post("https://api.444.dk/api/Account", user)
      .pipe(
        map((data: any) => {
return data;
        }));
  }

}