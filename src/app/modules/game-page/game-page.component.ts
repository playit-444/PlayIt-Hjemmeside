import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Game} from '../../shared/models/game';
import {GameService} from '../../shared/services/game.service';
@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {

  game: Game;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
  ) { }

  ngOnInit(): void {
    this.GetGame();
  }


  GetGame() {
    this.route
    .queryParams
    .subscribe(params => {
      const gameID = params.gameID;

      if(gameID != null) {
        this.gameService.GetGameType(gameID)
        .subscribe(success => {
          this.game = success;
        });
      }
    });
  }

}
