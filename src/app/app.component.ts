import {Component} from '@angular/core';
import {GameTypeService} from './services/gameType.service';
import {WebSocketService} from './services/web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PlayIt-Hjemmeside';

  constructor(private gameTypeService: GameTypeService, private webSocketService: WebSocketService) {

    this.gameTypeService.GetGameType()
      .subscribe(success => {
          console.log(success);
        },
        err => {
          console.log(err);
        });

    this.webSocketService.listen('test event').subscribe((data) => {
      console.log(data);
    });
  }
}

