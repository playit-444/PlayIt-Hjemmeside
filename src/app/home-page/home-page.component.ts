import { GameService } from '../services/game.service';
import { Game } from './../models/game';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { WebSocketService } from '../services/web-socket.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  @ViewChild('loginContent') loginContent: TemplateRef<any>;
  games: Array<Game> = [];

  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private gameService: GameService,
    private toastr: ToastrService,
    private webSocketService: WebSocketService
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

    this.gameService.GetGameTypes()
      .subscribe(data => {
        this.games = data.items;
      },
      err => {
        this.toastr.error(err.error, 'Der skete en fejl!');
        console.log(err);
      });
  }
}
