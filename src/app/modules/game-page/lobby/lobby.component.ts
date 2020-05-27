import { GameService } from './../../../shared/services/game.service';
import { Game } from './../../../shared/models/game';
import { UserService } from './../../../shared/services/user.service';
import { PlayerData } from './../../../shared/models/playerData';
import { LobbyData } from './../../../shared/models/lobbyData';
import {Component, OnInit} from '@angular/core';
import {WebSocketService} from '../../../shared/services/web-socket.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  counter = 120;
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
  ) {
    // Check if user change page then leave lobby
    //TODO add game endpoint
    const subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (!event.url.includes('/game/lobby?')) {
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
        this.tableId = params.tableID;
        this.webSocketService.sendMessage(this.tableId + '|JOIN');
        this.getGame(params.gameID);
      });
  }

  getGame(gameID: number) {
    return this.gameService.GetGameType(gameID)
    .subscribe(success => {
      this.game = success;
      this.getLobbyData();
    });
  }

  getLobbyData() {
    this.webSocketService.GetLobbyData().subscribe((value) => {
      if(value != null) {
        this.lobby = value;
        this.players = value.Players;

        if(this.players.length > 0)
        {
          let count = 0;
          this.players.forEach(player => {
            if(player.Ready)
              count++;
          });

          if(count > this.game.minimumPlayers)
            this.StartTimer();
        }

        if(this.players.length < this.lobby.MaxUsers)
          this.fillEmptySlots();

      }
    });
  }

  fillEmptySlots() {
    const emptyPlayer: PlayerData = {PlayerId: 0, Name: 'empty', Ready: false};

    for(let i = this.players.length; i < this.lobby.MaxUsers; i++)
    {
      this.players.push(emptyPlayer);
    }
  }

  Ready() {
    this.webSocketService.sendMessage(this.tableId + '|READY');
  }

  StartTimer() {
    const intervalId = setInterval(() => {
      this.counter = this.counter - 1;
      console.log(this.counter)
      if (this.counter === 0) clearInterval(intervalId)
    }, 1000)
  }
}
