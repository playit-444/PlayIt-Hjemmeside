import {Component, OnInit, Input} from '@angular/core';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import {Game} from '../../../shared/models/game';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent implements OnInit {
  @Input() game: Game;
  @Input() gameCount: any[] = [];
  amount: number;
  faUsers = faUsers;

  constructor() { }

  ngOnInit(): void {
    if(this.gameCount !== undefined)
      this.amount = this.gameCount.find(a => a.gameTypeId === this.game.gameTypeId);
  }
}
