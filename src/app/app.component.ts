import {Component} from '@angular/core';
import {GameTypeService} from './services/gameType.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PlayIt-Hjemmeside';

  constructor(private gameTypeService: GameTypeService) {

    this.gameTypeService.GetGameType()
      .subscribe(success => {
          console.log(success);
        },
        err => {
          console.log(err);
        });
  }
}

