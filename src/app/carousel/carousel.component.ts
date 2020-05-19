import { Component, OnInit, Input } from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import { Game } from '../models/game';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  @Input() games: Array<Game> = [];
  coverSrc: Array<string> = [];
  logoSrc: Array<string> = [];
  faPlay = faPlay;

  constructor(private ngbCarouselConfig: NgbCarouselConfig) { }

  ngOnInit(): void {
    if(this.games.length) {
      // tslint:disable-next-line: forin
      for(const key in this.games) {
        console.log(this.games[key].name);
        this.coverSrc.push('https://image.444.dk/' + this.games[key].name +'-cover.png');
        this.logoSrc.push('https://image.444.dk/' + this.games[key].name + '-logo.png')
      }
    }
  }
}
