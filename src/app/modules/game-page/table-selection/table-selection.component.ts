import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {GameService} from '../../../shared/services/game.service';
import {Game} from '../../../shared/models/game';
import {Table} from '../../../shared/models/table';
import {WebSocketService} from '../../../shared/services/web-socket.service';

@Component({
  selector: 'app-table-selection',
  templateUrl: './table-selection.component.html',
  styleUrls: ['./table-selection.component.css']
})
export class TableSelectionComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private webSocketService: WebSocketService,
  ) {
  }

  game: Game;
  public tables: Table[] = [];

  ngOnInit(): void {
    this.GetGame();
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
            this.tables = success;
          },
          err => {
            console.log(err.error);
          });
    }
  }
}