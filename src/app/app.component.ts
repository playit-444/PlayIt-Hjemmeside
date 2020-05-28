import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GameService} from './shared/services/game.service';
import { DataSharingService } from './shared/services/dataSharingService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ingame = false;
  title = 'PlayIt-Hjemmeside';

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private dataSharingService: DataSharingService
    ) {

    this.dataSharingService.isIngame.subscribe(value => {
      this.ingame = value;
      console.log("############################################ " + this.ingame);
      console.log("############################################ " + this.ingame);
      console.log("############################################ " + this.ingame);
      console.log("############################################ " + this.ingame);
      console.log("############################################ " + this.ingame);
    })
        
  }
}

