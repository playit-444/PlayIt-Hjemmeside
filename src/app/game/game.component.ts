import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  @Input() Logo: string;
  @Input() Background: string;

  constructor() { }

  ngOnInit(): void {
    console.log(this.Logo);
  }
}
