import {Component, OnInit} from '@angular/core';
import {WebSocketService} from '../../../shared/services/web-socket.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  counter = 120;
  tableId;

  constructor(
    private webSocketService: WebSocketService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    /*const intervalId = setInterval(() => {
      this.counter = this.counter - 1;
      console.log(this.counter)
      if (this.counter === 0) clearInterval(intervalId)
    }, 1000)*/

    this.route
      .queryParams
      .subscribe(params => {
        this.tableId = params.tableID;
        this.webSocketService.sendMessage(this.tableId + '|JOIN');
      });
  }

  Ready() {
    this.webSocketService.sendMessage(this.tableId + '|READY');
  }
}
