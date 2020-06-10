import {WebSocketService} from '../../../shared/services/web-socket.service';
import {Component, OnInit, Input, ViewChild, ElementRef, AfterViewChecked} from '@angular/core';
import {GameMessage} from 'src/app/shared/models/gameMessage';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  static subscribeLobby;
  static subscribeTable;
  @ViewChild('scrollChat') private chatScrollContainer: ElementRef;

  constructor(private webSocketService: WebSocketService, private router: Router, private route: ActivatedRoute
  ) {
  }

  @Input() gameId: string;
  chat: GameMessage[] = [];
  gameMessageId: string;

  ngOnInit(): void {
    // Scroll to bottom of chat
    this.scrollToBottom();
    // Subscription when user changes route
    // is used for handling when a user leave chat section
    const subscription = this.router.events.subscribe((event) => {
      // Get the specific event
      if (event instanceof NavigationEnd) {
        // Check if user change route and not land on lobby or ingame
        if (!event.url.includes('/lobby?') && !event.url.includes('game/ingame')) {
          // Check if subscription is set
          if (ChatComponent.subscribeLobby) {
            // Unsubscribe and set to null
            ChatComponent.subscribeLobby.unsubscribe();
            ChatComponent.subscribeLobby = null;
            subscription.unsubscribe();
            // Clear chat
            this.chat = [];
          }
        }
        // Check if user leaves game endpoint
        if (!event.url.includes('/game/')) {
          // Check if subscription is set
          if (ChatComponent.subscribeTable) {
            // Unsubscribe and set to null
            ChatComponent.subscribeTable.unsubscribe();
            ChatComponent.subscribeTable = null;
            // Clear chat
            this.chat = [];
          }
        }
      }
    });

    this.route.queryParams.subscribe(queryParams => {
      if (queryParams.gameID) {
        if (Number(this.gameId)) {
          this.gameMessageId = this.gameId + '-LOBBYCHAT';
          this.webSocketService.sendMessage(this.gameMessageId + '|JOIN');
          if (!ChatComponent.subscribeLobby) {
            ChatComponent.subscribeLobby = this.webSocketService.GetLobbyChatMessage().subscribe((value) => {
              if (value !== null)
                this.chat.push(value);
            });
          }
        }
      }

      if (queryParams.tableID) {
        if (!Number(this.gameId)) {
          this.gameMessageId = queryParams.tableID + '-TABLECHAT';
          this.webSocketService.sendMessage(this.gameMessageId + '|JOIN');
          ChatComponent.subscribeTable = this.webSocketService.GetTableChatMessage().subscribe((value) => {
            if (value !== null)
              this.chat.push(value);
          });
        }
      }
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.chatScrollContainer.nativeElement.scrollTop = this.chatScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

// Send message to all
  sendMessage(event: any) {
    this.webSocketService.sendMessage(this.gameMessageId + '|MSG|' + event.target.value);
    event.target.value = '';
  }
}
