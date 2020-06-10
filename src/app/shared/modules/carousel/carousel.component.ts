import {Component, OnInit, Input} from '@angular/core';
import {faPlay} from '@fortawesome/free-solid-svg-icons';
import {Game} from '../../models/game';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  @Input() Games: Array<Game> = [];
  faPlay = faPlay;

  constructor() {
  }

  ngOnInit(): void {
  }
}
