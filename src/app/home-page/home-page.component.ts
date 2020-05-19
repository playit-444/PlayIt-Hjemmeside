import { Game } from './../models/game';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  @ViewChild('loginContent') loginContent: TemplateRef<any>;
  GameTypes: Array<Game> = [];

  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.route
      .queryParams
      .subscribe(params => {
        const openLogin = params.openlogin;

        if (openLogin != null) {
          this.modalService.open(this.loginContent);
        }
      });
      const game: Game = {
        name: 'krig',
        description: 'Description'
      };

      this.GameTypes.push(game);
      this.GameTypes.push(game);
  }

}
