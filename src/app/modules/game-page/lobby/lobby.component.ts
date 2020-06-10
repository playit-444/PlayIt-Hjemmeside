import {GameService} from '../../../shared/services/game.service';
import {Game} from '../../../shared/models/game';
import {UserService} from '../../../shared/services/user.service';
import {PlayerData} from '../../../shared/models/playerData';
import {LobbyData} from '../../../shared/models/lobbyData';
import {Component, OnInit} from '@angular/core';
import {WebSocketService} from '../../../shared/services/web-socket.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  timeLeft = 60;
  timerStarted = false;
  count: number;

  tableId: any;
  game: Game;
  lobby: LobbyData;
  players: PlayerData[] = [];

  constructor(
    private webSocketService: WebSocketService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private gameService: GameService,
    private cookieService: CookieService
  ) {
    // Check if user change page then leave lobby
    const subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (!event.url.includes('/game/lobby?') && (!event.url.includes('/game/ingame?'))) {
          this.cookieService.delete('inlobby');
          this.cookieService.delete('ingame');
          webSocketService.sendMessage(this.tableId + '|LEAVE');
          subscription.unsubscribe();
        }
      }
    });
  }

  ngOnInit(): void {
    this.route
      .queryParams
      .subscribe(params => {
        // Join lobby
        this.tableId = params.tableID;
        this.webSocketService.sendMessage(this.tableId + '|JOIN');
        this.getGameType(params.gameID);
      });
  }

  // Get gameType
  getGameType(gameID: number) {
    return this.gameService.GetGameType(gameID)
      .subscribe(success => {
        this.game = success;
        this.getLobbyData();
      });
  }

  // Get information about the lobby
  getLobbyData() {
    this.webSocketService.GetLobbyData().subscribe((value) => {
        if (value != null) {
          if (value.Timer || value.Timer === 0) {
            this.timerHandler(value.Timer);
          } else {
            this.lobby = value;
            this.players = value.Players;

            if (this.players.length > 0) {
              this.count = 0;
              this.players.forEach(player => {
                if (player.Ready)
                  this.count++;
              });
            }

            if (this.players.length < this.lobby.MaxUsers)
              this.fillEmptySlots();

          }
        }
      }
    );
  }

  // If there is empty slots fill with empty player
  fillEmptySlots() {
    const emptyPlayer: PlayerData = {PlayerId: 0, Name: 'empty', Ready: false};
    for (let i = this.players.length; i < this.lobby.MaxUsers; i++) {
      this.players.push(emptyPlayer);
    }
  }

  // Send the player is ready to gameServer
  Ready() {
    this.webSocketService.sendMessage(this.tableId + '|READY');
  }

  // Handle timer information from gameServer
  private timerHandler(timer: any) {
    // Cancel timer
    if (timer === -1) {
      this.timerStarted = false;
    } else if (timer === 0) {
      this.cookieService.set('ingame', 'true');
      this.router.navigate(['game/ingame'], {queryParamsHandling: 'merge'});
    } else {
      this.timerStarted = true;
      this.timeLeft = timer
    }
  }
}
