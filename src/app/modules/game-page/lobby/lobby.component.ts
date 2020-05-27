import { PlayerData } from './../../../shared/models/playerData';
import { LobbyData } from './../../../shared/models/lobbyData';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {WebSocketService} from '../../../shared/services/web-socket.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit, OnDestroy {

  counter = 120;
  tableId: any;
  lobby: LobbyData;
  players: PlayerData[] = [];

  constructor(
    private webSocketService: WebSocketService,
    private route: ActivatedRoute,
    private router: Router
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
    /*const intervalId = setInterval(() => {
      this.counter = this.counter - 1;
      console.log(this.counter)
      if (this.counter === 0) clearInterval(intervalId)
    }, 1000)*/

    this.route
      .queryParams
      .subscribe(params => {
        this.tableId = params.tableID;
        this.webSocketService.sendMessage(this.tableId + '|JOIN');
      });

      this.webSocketService.GetLobbyData().subscribe((value: any) => {
        console.log('value: ', value);
        if(value != null) {
          if(value?.ReadyState)
          {
            const playerindex = this.players.findIndex(a => a.PlayerId === value.PlayerID)
            console.log(this.players[playerindex].Name);
            this.players[playerindex].Ready = true;
          }
          else {
            this.lobby = value;
            this.players = value.Players;
            console.log(this.players.length);
            console.log(this.lobby.MaxUsers);
            if(this.players.length < this.lobby.MaxUsers)
            {
              this.fillEmptySlots();
            }
          }
        }
      });
  }

  fillEmptySlots() {
    const emptyPlayer: PlayerData = {PlayerId: 0, Name: 'empty', Ready: false};

    for(let i = this.players.length; i < this.lobby.MaxUsers; i++)
    {
      console.log('HIT');
      this.players.push(emptyPlayer);
    }
  }

  ngOnDestroy(): void {
    //this.webSocketService.sendMessage(this.tableId + '|LEAVE');
  }

  Ready() {
    this.webSocketService.sendMessage(this.tableId + '|READY');
  }
}
