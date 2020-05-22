import { Component, OnInit, Input } from '@angular/core';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { Game } from 'src/app/models/game';
import { Table } from 'src/app/models/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() game: Game;
  @Input() table: Table;
  @Input() tableID: number;

  faUsers = faUsers;

  constructor() { }

  ngOnInit(): void {
    console.log(this.tableID);
  }

}
