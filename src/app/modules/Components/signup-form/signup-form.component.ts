import {MatDialog} from '@angular/material/dialog';
import {Component, OnInit} from '@angular/core';
import {faSquare, faCheckSquare} from '@fortawesome/free-regular-svg-icons';
import {faUser, faAt, faKey} from '@fortawesome/free-solid-svg-icons';
import {ToastrService} from 'ngx-toastr';
import {MatDialogRef} from '@angular/material/dialog';
import {LoginFormComponent} from '../login-form/login-form.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {User} from '../../../shared/models/user';
import {UserService} from '../../../shared/services/user.service';


@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  faSquare = faSquare;
  faCheckSquare = faCheckSquare;

  terms = false;
  newsletter = false;

  avatar;

  faUser = faUser;
  faAt = faAt;
  faKey = faKey;
  signUpForm: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<SignupFormComponent>,
    private loginForm: MatDialog,
  ) {
  }


  ngOnInit(): void {

    this.signUpForm = this.fb.group({
      userName: [''],
      email: [''],
      password: [''],
      confirmPassword: [''],
      avatar: null
    });
  }

  // Open login component
  login() {
    this.loginForm.open(LoginFormComponent);
    this.dialogRef.close();
  }

  // Toggle checkbox
  changeCheckbox(caller) {
    if (caller === 'newsletter') {
      this.newsletter = !this.newsletter;
    } else {
      this.terms = !this.terms;
    }
  }

  createUser() {
    // Check if password and password 2 is the same
    if (this.signUpForm.value.password !== this.signUpForm.value.confirmPassword) {
      this.toastr.error('Password og Gentag Password skal matche', 'Fejl!');
      // Check if terms is enabled
    } else if (!this.terms) {
      this.toastr.error('Du skal godkende vores betingelser for at kunne fortsætte', 'Fejl!');
    } else {
      const user: User = {
        userName: this.signUpForm.value.userName,
        email: this.signUpForm.value.email,
        password: this.signUpForm.value.password,
        avatar: this.avatar
      }
      // Create user
      this.userService.CreateUser(user)
        .subscribe(() => {
            this.toastr.success('Du er nu oprettet. Du vil modtage en validerings e-mail', 'Succes!');
            this.dialogRef.close();
          },
          err => {
            this.toastr.error(err.error, 'Der skete en fejl!');
          });
    }
  }

  // Get the uplaoded file
  onFileChanged(event) {
    const me = this;
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    // Check if reader got the avatar
    reader.onload = () => {
      me.avatar = reader.result;
    };
    reader.onerror = (error) => {
      console.log(error)
    };
  }
}
