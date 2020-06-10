import {PlayerInfo} from '../../../../shared/models/playerInfo';
import {Component, OnInit, Input} from '@angular/core';
import {faCheck, faUser} from '@fortawesome/free-solid-svg-icons';
import {UserService} from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  FaCheck = faCheck;
  FaUser = faUser;

  player: PlayerInfo;
  done: Promise<boolean>;

  @Input() playerID: number;
  @Input() readyState: boolean;

  constructor(
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    // Check if playerId is not 0
    if (this.playerID !== 0) {
      // Get user
      this.userService.GetUser(this.playerID)
        .subscribe(success => {
          this.player = success;
          // Html can now load
          this.done = Promise.resolve(true);
        });
    } else {
      // Html can now load
      this.done = Promise.resolve(true);
    }
  }
}
