import {Component, OnInit, Input} from '@angular/core';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import {Game} from '../../shared/models/game';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent implements OnInit {
  @Input() game: Game;
  faUsers = faUsers;

  constructor() { }

  ngOnInit(): void {
  }
}
