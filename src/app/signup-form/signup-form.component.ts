import { Component, OnInit, Input } from '@angular/core';
import { faUser, faAt, faKey } from '@fortawesome/free-solid-svg-icons';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';


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
  signUpForm: FormGroup;

  constructor(private customerService: UserService, private fb: FormBuilder,) { }




  ngOnInit(): void {

    this.signUpForm = this.fb.group({
      userName: [''],
      email: [''],
      password:['']
    });
  }

  CreateUser() {

    let user: User = {
      userName: this.signUpForm.value.userName,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
      ipv4: "",
    }

    this.customerService.CreateUser(user)
    .subscribe(success => {
      console.log(success);
      this.modal.close("test");
    },
      err => {
        console.log(err);
      });
  }

}
