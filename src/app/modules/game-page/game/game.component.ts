import {Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import {DataSharingService} from 'src/app/shared/services/dataSharingService';
import {WebSocketService} from '../../../shared/services/web-socket.service';
import {GameMessage} from 'src/app/shared/models/gameMessage';
import {ActivatedRoute} from '@angular/router';

declare const UnityLoader: any;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    private webSocketService: WebSocketService,
    private dataSharingService: DataSharingService,
    private route: ActivatedRoute,
  ) {
    this.dataSharingService.isIngame.next(true);
    this.loadScripts(this.gameScripts);
  }

  static subscription;
  private gameInstance;
  gameScripts = [
    '../../assets/games/Ludo/Build/UnityLoader.js'
  ];

  tableId: any;

  ngOnInit(): void {
    this.route
      .queryParams
      .subscribe(params => {
        this.tableId = params.tableID;
        console.log(this.tableId + '|STARTGAME')
        this.webSocketService.sendMessage(this.tableId + '|STARTGAME');
      });
  }

  ngAfterViewInit(): void {
    this.gameInstance = UnityLoader.instantiate('gameContainer', 'assets/games/Ludo/Build/Ludo.json');
    if (!GameComponent.subscription)
      GameComponent.subscription = this.webSocketService.GetSocketMessage().subscribe(value => {
        console.log(value);
        this.SendMsgToUnity(value);
      });
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
    this.gameInstance.SendMessage('GameManager', 'HandleMessageFromJS', message);
  }

  public HandleUnityMessage(element) {
    const message: GameMessage = element.target.attributes['data-message'].value;
    this.webSocketService.sendMessage(message);
  }

}
