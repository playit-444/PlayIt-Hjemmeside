import {Component, OnInit, Input} from '@angular/core';
import { Game } from '../models/game';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  @Input() game: Game;
  faUsers = faUsers;

  constructor() { }

  ngOnInit(): void {
  }
}
