import {WebSocketService} from '../../../shared/services/web-socket.service';
import {Component, OnInit, Input} from '@angular/core';
import {GameMessage} from 'src/app/shared/models/gameMessage';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input() gameId: string;

  chat: GameMessage[] = [];

  constructor(private webSocketService: WebSocketService) {
  }

  ngOnInit(): void {
    this.webSocketService.sendMessage(this.gameId + '|JOIN');
    if (Number(this.gameId)) {
      this.webSocketService.GetLobbyChatMessage().subscribe((value) => {
        if (value !== null)
          this.chat.push(value);
      });
    } else {
      this.webSocketService.GetTableChatMessage().subscribe((value) => {
        if (value !== null)
          this.chat.push(value);
      });
    }
  }

  // Send message to all
  sendMessage(event: any) {
    this.webSocketService.sendMessage(this.gameId + '|MSG|' + event.target.value);
    event.target.value = '';
  }
}
