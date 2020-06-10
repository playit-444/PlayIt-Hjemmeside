import {Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import {DataSharingService} from 'src/app/shared/services/dataSharingService';
import {WebSocketService} from '../../../shared/services/web-socket.service';
import {GameMessage} from 'src/app/shared/models/gameMessage';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

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
    private cookieService: CookieService
  ) {
    // Update isIngame value so width of page changes so there is more space to the game
    this.dataSharingService.isIngame.next(true);

    // Load Unity scripts
    this.loadScripts(this.gameScripts);

    const subscription = this.router.events.subscribe((event) => {
      // Check instance of event
      if (event instanceof NavigationEnd) {
        // Check if url don't include game
        if (!event.url.includes('/game/ingame?')) {
          // Delete cookies
          this.cookieService.delete('inlobby');
          this.cookieService.delete('ingame');
          // Leave table and tableChat
          webSocketService.sendMessage(this.tableId + '|LEAVE');
          webSocketService.sendMessage(this.tableId + 'TABLECHAT|LEAVE');
          subscription.unsubscribe();
          this.waitingForResponse = true;
          // TODO Quick fix there is something wrong with unity so the browser need to fully reload after each game
          location.reload();
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
    this.cookieService.delete('inlobby');
    this.route
      .queryParams
      .subscribe(params => {
        // StartGame
        this.tableId = params.tableID;
        this.webSocketService.sendMessage(this.tableId + '|STARTGAME');
      });
    // Create gameInstance
    this.gameInstance = UnityLoader.instantiate('gameContainer', 'assets/games/Ludo/Build/Ludo.json');
  }

  ngAfterViewInit(): void {
    if (!GameComponent.subscription)
      GameComponent.subscription = this.webSocketService.GetSocketMessage().subscribe(value => {
        if (value != null) {
          // Check if unity have send the first request else que message
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
    // Loop all scripts
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

  // Send a message to unity
  public SendMsgToUnity(message) {
    this.gameInstance.SendMessage('GameManager', 'HandleMessageFromJS', JSON.stringify(message));
  }

  // Handle message from unity
  public HandleUnityMessage(element) {

    // Parse json to GameMessage
    const message: GameMessage = JSON.parse(element.target.value);
    // Check if action is Ready and send que to unity and clear after
    if (message.Action === 'READY') {
      if (this.que.length > 0) {
        for (const item of this.que) {
          this.SendMsgToUnity(item);
        }
        this.que = [];
      }
      this.waitingForResponse = false;
    } else {
      // Send message to unity
      this.webSocketService.sendMessage(message.RoomId + '|' + message.Action + '|' + message.Args);
    }
  }
}
