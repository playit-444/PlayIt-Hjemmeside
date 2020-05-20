import { Component, OnInit, Input } from '@angular/core';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() Logo: string;
  faUsers = faUsers;

  constructor() { }

  ngOnInit(): void {
    
  }

}
