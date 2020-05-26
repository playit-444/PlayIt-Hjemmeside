import { Component, OnInit, Input } from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import {ToastrService} from 'ngx-toastr';
import {Game} from '../../models/game';
import {GameService} from '../../services/game.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  @Input() Games: Array<Game> = [];
  faPlay = faPlay;

  constructor(
    private ngbCarouselConfig: NgbCarouselConfig,
    private gameService: GameService,
    private toastr: ToastrService,
    ) { }

  ngOnInit(): void {
  }
}
