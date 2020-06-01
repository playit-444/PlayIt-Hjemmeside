import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { DataSharingService } from 'src/app/shared/services/dataSharingService';
import {WebSocketService} from '../../../shared/services/web-socket.service';
import { GameMessage } from 'src/app/shared/models/gameMessage';
declare const UnityLoader: any;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, AfterViewInit, OnDestroy {
  private gameInstance;
  gameScripts = [
    '../../assets/games/Ludo/Build/UnityLoader.js'
  ];

  constructor(
    private webSocketService: WebSocketService,
    private dataSharingService: DataSharingService
  ) {
    this.dataSharingService.isIngame.next(true);
    this.loadScripts(this.gameScripts);

    webSocketService.GetSocketMessage().subscribe(value => {
      this.SendMsgToUnity(value);
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.gameInstance = UnityLoader.instantiate("gameContainer", "assets/games/Ludo/Build/Ludo.json");
  }

  ngOnDestroy(): void {
    this.dataSharingService.isIngame.next(false);
  }

  loadScripts(scripts: string[]) {
    for (let i = 0; i < scripts.length; i++) {
      const node = document.createElement('script');
      node.src = scripts[i];
      node.type = 'text/javascript';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }

  EnableFullscreen() {
    this.gameInstance.SetFullscreen(1);
  }

  public SendMsgToUnity(message) {
    this.gameInstance.SendMessage("JSUnityBridge", "HandleMessageFromJS", message);
  }

  public HandleUnityMessage(element) {
    var message: GameMessage = element.target.attributes['data-message'].value;
    this.webSocketService.sendMessage(message);
  }

}
