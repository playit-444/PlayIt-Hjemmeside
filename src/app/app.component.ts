import {Component} from '@angular/core';
import {GameService} from './services/game.service';
import {WebSocketService} from './services/web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PlayIt-Hjemmeside';

  constructor(private gameService: GameService, private webSocketService: WebSocketService) {

    this.gameService.GetGameTypes()
      .subscribe(success => {
          // console.log(success);
        },
        err => {
          //console.log(err);
        });

    this.webSocketService.listen('test event').subscribe((data) => {
      console.log(data);
    });
  }
}

