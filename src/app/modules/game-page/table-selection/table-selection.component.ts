import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GameService} from '../../../shared/services/game.service';
import {Game} from '../../../shared/models/game';
import {Table} from '../../../shared/models/table';

@Component({
  selector: 'app-table-selection',
  templateUrl: './table-selection.component.html',
  styleUrls: ['./table-selection.component.css']
})
export class TableSelectionComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
  ) {
  }

  game: Game;
  public tables: Table[] = [];
  public _reload = true;

  ngOnInit(): void {
    this.GetGameType();
  }

  GetGameType() {
    this.route
      .queryParams
      .subscribe(params => {
        const gameID = params.gameID;
        if (gameID != null) {
          // GameType information
          this.gameService.GetGameType(gameID)
            .subscribe(success => {
                this.game = success;
                // Get all tables for the specific gameType
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
      // Get tables from API
      this.gameService.GetTables(id)
        .subscribe(success => {
            this.tables = success;
          },
          err => {
            console.log(err.error);
            setTimeout(() => location.reload(), 1000);
          });
    }
  }
}
