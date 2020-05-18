import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-game-selection',
  templateUrl: './game-selection.component.html',
  styleUrls: ['./game-selection.component.css']
})
export class GameSelectionComponent implements OnInit {

  @Input() gameName: string;

  constructor() { }

  ngOnInit(): void {
  }
}
