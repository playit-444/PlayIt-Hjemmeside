import { AlertService } from './../services/alert.service';
import { Component, OnInit, Input } from '@angular/core';
import { faUser, faAt, faKey } from '@fortawesome/free-solid-svg-icons';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


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
    private userService: UserService,
     private fb: FormBuilder,
     private toastr: ToastrService
     ) { }




  ngOnInit(): void {

    this.signUpForm = this.fb.group({
      userName: [''],
      email: [''],
      password:['']
    });
  }

  CreateUser() {


    const user: User = {
      userName: this.signUpForm.value.userName,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password
    }

    this.userService.CreateUser(user)
    .subscribe(success => {
      this.toastr.success('Du er nu oprettet. Du vil modtage en validerings e-mail', 'Succes!');
      this.modal.close();
    },
      err => {
        this.toastr.error(err.error, 'Der skete en fejl!');
        console.log(err.error);
      });
  }

}
