import { Component, OnInit } from '@angular/core';
import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  faSquare = faSquare;
  faCheckSquare = faCheckSquare;
  public checkboxChecked = false;
  
  changeCheckbox() {
    if (this.checkboxChecked) {
      this.checkboxChecked = false;
    }
    else {
      this.checkboxChecked = true;
    }
  }

}
