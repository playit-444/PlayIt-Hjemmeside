import {Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import {DataSharingService} from 'src/app/shared/services/dataSharingService';
import {WebSocketService} from '../../../shared/services/web-socket.service';
import {GameMessage} from 'src/app/shared/models/gameMessage';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

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
    private router: Router,
  ) {
    this.dataSharingService.isIngame.next(true);
    this.loadScripts(this.gameScripts);

    const subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (!event.url.includes('/game/ingame?')) {
          webSocketService.sendMessage(this.tableId + '|LEAVE');
          webSocketService.sendMessage(this.tableId + 'TABLECHAT|LEAVE');
          subscription.unsubscribe();
        }
      }
    });
  }

  static subscription;
  private gameInstance;
  private waitingForResponse = true;
  private que: any[] = [];
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
    this.gameInstance = UnityLoader.instantiate('gameContainer', 'assets/games/Ludo/Build/Ludo.json');
  }

  ngAfterViewInit(): void {
    if (!GameComponent.subscription)
      GameComponent.subscription = this.webSocketService.GetSocketMessage().subscribe(value => {
        if (value != null) {
          console.log('ToUnity');
          console.log(value);
          if (this.waitingForResponse) {
            this.que.push(value);
          } else {
            this.SendMsgToUnity(value);
          }
        }
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
    this.gameInstance.SendMessage('GameManager', 'HandleMessageFromJS', JSON.stringify(message));
  }

  public HandleUnityMessage(element) {
    // const message: GameMessage = element.target.value;
    const message: GameMessage = JSON.parse(element.target.value);
    if (message.Action === 'READY') {
      if (this.que.length > 0) {
        for (const item of this.que) {
          this.SendMsgToUnity(item);
        }
        this.que = [];
      }
      this.waitingForResponse = false;
    } else {
      console.log('ToSocket');
      console.log(message);
      this.webSocketService.sendMessage(message.RoomId+'|'+message.Action+'|'+message.Args);
    }
  }
}
