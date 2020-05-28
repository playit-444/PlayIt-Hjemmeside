import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { GameService } from 'src/app/shared/services/game.service';
import { ToastrService } from 'ngx-toastr';
import { Game } from 'src/app/shared/models/game';

@Component({
  selector: 'app-games-page',
  templateUrl: './games-page.component.html',
  styleUrls: ['./games-page.component.css']
})
export class GamesPageComponent implements OnInit {
  @ViewChild('loginContent') loginContent: TemplateRef<any>;
  games: Array<Game> = [];

  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private gameService: GameService,
    private toastr: ToastrService,
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