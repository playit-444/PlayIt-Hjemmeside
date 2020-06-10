import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Game} from '../../shared/models/game';
import {GameService} from '../../shared/services/game.service';
import {WebSocketService} from '../../shared/services/web-socket.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {
  game: Game;
  lobbyChat = true;
  lobbyId = '';
  gameId = '';


  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private webSocketService: WebSocketService,
    private router: Router
  ) {
    // Check if user change page then leave lobby
    const subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (!event.url.includes('/game')) {
          webSocketService.sendMessage(this.game.gameTypeId + '|LEAVE');
          subscription.unsubscribe();
        }
        if (event.url.includes('gameID=')) {
          // set gameId to gameId
          this.gameId = event.url.split('gameID=')[1];
          if (this.gameId.includes('&table')) {
            // set gameId to tableId
            this.gameId = this.gameId.split('&tableID')[0];
          }
        }
        // Check if inside table
        if (event.url.includes('tableID=')) {
          this.lobbyId = 'false';
        }
      }
    });
  }

  ngOnInit(): void {
    this.GetGameType();
  }

  // GameType informations
  GetGameType() {
    const routing = this.route
      .queryParams
      .subscribe(params => {
        const gameID = params.gameID;
        if (gameID != null) {
          this.gameService.GetGameType(gameID)
            .subscribe(success => {
              this.game = success;
              routing.unsubscribe();
            });
        }
      });
  }

  showLobby(bool) {
    this.lobbyChat = bool;
  }
}
