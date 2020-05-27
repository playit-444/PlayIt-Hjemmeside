import { PlayerData } from './../../../../shared/models/playerData';
import { Component, OnInit, Input } from '@angular/core';
import {faCheck} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  FaCheck = faCheck;

  @Input() player: PlayerData;

  constructor() { }

  ngOnInit(): void {

    console.log(this.player);
    console.log(this.player.Name);
  }

}
