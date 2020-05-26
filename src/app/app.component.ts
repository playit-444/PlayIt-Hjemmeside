import {Component} from '@angular/core';
import {GameService} from './shared/services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PlayIt-Hjemmeside';

  constructor(private gameService: GameService) {

    this.gameService.GetGameTypes()
      .subscribe(success => {
          // console.log(success);
        },
        err => {
          // console.log(err);
        });
  }
}

