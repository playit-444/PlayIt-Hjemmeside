import {Component, OnInit, Input} from '@angular/core';
import {faSquare, faCheckSquare} from '@fortawesome/free-regular-svg-icons';
import {SignupFormComponent} from 'src/app/modules/Components/signup-form/signup-form.component';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {
  faSquare = faSquare;
  faCheckSquare = faCheckSquare;
  public checkboxChecked = false;
  @Input() cbId: string;
  @Input() cbText: string;


  constructor(
    public dialogRef: MatDialogRef<SignupFormComponent>
  ) {
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

  closeModal() {
    this.dialogRef.close();
  }

}
