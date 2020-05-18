import { AlertService } from './../services/alert.service';
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

  constructor(
    private customerService: UserService,
     private fb: FormBuilder,
     private alertService: AlertService
     ) { }




  ngOnInit(): void {

    this.signUpForm = this.fb.group({
      userName: [''],
      email: [''],
      password:['']
    });
  }

  CreateUser() {

    // reset alerts on submit
    this.alertService.clear();

    const user: User = {
      userName: this.signUpForm.value.userName,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password
    } 

    this.customerService.CreateUser(user)
    .subscribe(success => {
      this.alertService.success('Du er nu oprettet!', true);
      this.modal.close();
    },
      err => {
        this.alertService.error('Noget Gik Galt!');
        console.log(err);
      });
  }

}
