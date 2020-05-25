import {Component, OnInit, Input, ChangeDetectionStrategy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GameService} from 'src/app/services/game.service';
import {Table} from 'src/app/models/table';
import {Game} from 'src/app/models/game';
import {WebSocketService} from '../../services/web-socket.service';
import { map, catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-table-selection',
  templateUrl: './table-selection.component.html',
  styleUrls: ['./table-selection.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableSelectionComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private webSocketService: WebSocketService,
  ) {}

  game: Game;
  tables: Array<Table> = [];

  ngOnInit(): void {

    //this.webSocketService.sendMessage('HALLO');

    this.GetGame();

    const table: Table = {
      roomID: '1',
      name: 'string',
      maxUsers: 2,
      currentUsers: 1,
      private: false
    }
    /*this.tables.push(table);
    this.tables.push(table);
    this.tables.push(table);
    this.tables.push(table);
    this.tables.push(table);
    this.tables.push(table);
    this.tables.push(table);
    this.tables.push(table);
    this.tables.push(table);*/

  }

  GetGame() {
    this.route
      .queryParams
      .subscribe(params => {
        const gameID = params.gameID;

        if (gameID != null) {
          this.gameService.GetGameType(gameID)
            .subscribe(success => {
                this.game = success;
                this.GetTables(success.gameTypeId);
              },
              err => {
                console.log(err.error);
              });
        }
      });
  }


  GetTables(id: number) {
    if (id != null) {
      this.gameService.GetTables(id)
        .subscribe(success => {
            console.log(success);
          },
          err => {
            console.log(err.error);
          });
    }
  }
}
