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
      }
    });

    const subscriptionLobbyChat = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (!event.url.includes('/tableID')) {
          const splitted = event.url.split('tableID=');
          this.lobbyId = splitted[1] + '-TABLECHAT';
        }
      }
    });
  }

  ngOnInit(): void {
    this.GetGame();
  }

  GetGame() {
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
