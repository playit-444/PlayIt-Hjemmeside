import {Component, OnInit, Input} from '@angular/core';
import {faUsers} from '@fortawesome/free-solid-svg-icons';
import {Game} from '../../../../shared/models/game';
import {Table} from '../../../../shared/models/table';
import {CookieService} from 'ngx-cookie-service';

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

  constructor(private cookieService: CookieService) {
  }

  ngOnInit(): void {
  }

  SetIngameCookie() {
    this.cookieService.set('inlobby', 'true');
  }
}
