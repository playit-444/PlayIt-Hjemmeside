import {WebSocketService} from '../../../shared/services/web-socket.service';
import {Component, OnInit, Input} from '@angular/core';
import {GameMessage} from 'src/app/shared/models/gameMessage';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private webSocketService: WebSocketService, private router: Router, private route: ActivatedRoute
  ) {
  }

  @Input() gameId: string;
  chat: GameMessage[] = [];
  gameMessageId: string;
  subscribeLobby;
  subscribeTable;

  ngOnInit(): void {
    const subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (!event.url.includes('/lobby?') && !event.url.includes('game/ingame')) {
          if (this.subscribeLobby) {
            this.subscribeLobby.unsubscribe();
            subscription.unsubscribe();
          }
        }
        if (!event.url.includes('/game/')) {
          if (this.subscribeTable)
            this.subscribeTable.unsubscribe();
        }
      }
    });

    this.route.queryParams.subscribe(queryParams => {
      if (queryParams.gameID) {
        if (Number(this.gameId)) {
          this.gameMessageId = this.gameId + '-LOBBYCHAT';
          this.webSocketService.sendMessage(this.gameMessageId + '|JOIN');
          this.subscribeLobby = this.webSocketService.GetLobbyChatMessage().subscribe((value) => {
            if (value !== null)
              this.chat.push(value);
          });
        }
      }

      if (queryParams.tableID) {
        if (!Number(this.gameId)) {
          this.gameMessageId = queryParams.tableID + '-TABLECHAT';
          this.webSocketService.sendMessage(this.gameMessageId + '|JOIN');
          this.subscribeTable = this.webSocketService.GetTableChatMessage().subscribe((value) => {
            if (value !== null)
              this.chat.push(value);
          });
        }
      }
    });
  }

// Send message to all
  sendMessage(event: any) {
    this.webSocketService.sendMessage(this.gameMessageId + '|MSG|' + event.target.value);
    event.target.value = '';
  }
}
