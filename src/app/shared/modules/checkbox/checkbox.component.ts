import {Component, OnInit, Input} from '@angular/core';
import {faSquare, faCheckSquare} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {
  faSquare = faSquare;
  faCheckSquare = faCheckSquare;
  public checkboxChecked = false;
  @Input() cbId: number;
  @Input() cbText: string;

  constructor() {
  }

  ngOnInit(): void {
  };

  changeCheckbox() {
    if (this.checkboxChecked) {
      this.checkboxChecked = false;
    } else {
      this.checkboxChecked = true;
    }
  }

}
