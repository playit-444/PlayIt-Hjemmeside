import { Component, OnInit, Input } from '@angular/core';
import { faUser, faAt, faKey } from '@fortawesome/free-solid-svg-icons';

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

  constructor() { }

  ngOnInit(): void {
  }

  CreateUser() {
    this.modal.close("test");
  }

}