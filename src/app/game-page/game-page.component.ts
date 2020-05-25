import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../services/game.service';
import { Game } from '../models/game';

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
    //console.log(this.game);
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
        },
        err => {
          //console.log(err.error);
        });
      }
    });
  }

}
