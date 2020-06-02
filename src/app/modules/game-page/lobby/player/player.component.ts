import { PlayerInfo } from './../../../../shared/models/playerInfo';
import { PlayerData } from './../../../../shared/models/playerData';
import { Component, OnInit, Input } from '@angular/core';
import {faCheck, faUser} from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/shared/services/user.service';

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
    ) { }

  ngOnInit(): void {
    if(this.playerID !== 0)
    {
      this.userService.GetUser(this.playerID)
      .subscribe(success => {
        this.player = success;
        this.done = Promise.resolve(true);
      });
    }
    else {
      this.done = Promise.resolve(true);
    }
  }
}
