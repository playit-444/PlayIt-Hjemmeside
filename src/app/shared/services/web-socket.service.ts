import {LobbyData} from '../models/lobbyData';
import {Injectable} from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {CookieService} from 'ngx-cookie-service';
import {BehaviorSubject, Observable} from 'rxjs';
import {GameMessage} from '../models/gameMessage';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private subject: WebSocketSubject<any>;
  private lobbyMessage: BehaviorSubject<any>;
  private ingameMessage: BehaviorSubject<GameMessage>;
  private lobbyChatMessage: BehaviorSubject<GameMessage>;
  private tableChatMessage: BehaviorSubject<GameMessage>;

  constructor(private cookieService: CookieService, private router: Router) {
    this.lobbyMessage = new BehaviorSubject<LobbyData>(null);
    this.ingameMessage = new BehaviorSubject<GameMessage>(null);
    this.lobbyChatMessage = new BehaviorSubject<GameMessage>(null);
    this.tableChatMessage = new BehaviorSubject<GameMessage>(null);
    this.subject = webSocket('wss://ws.444.dk/ws');
    // this.subject = webSocket('wss://localhost:5001/ws');
    this.sendMessage(this.cookieService.get('session-token'));

    this.subject.subscribe(
      msg => this.readMessage(msg), // Called whenever there is a message from the server.
      err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      () =>    this.router.navigateByUrl('')// Called when connection is closed (for whatever reason).
    );
  }

  sendMessage(msg: any) {
    this.subject.next(msg);
  }

  close() {
    this.subject.complete();
  }

  readMessage(msg: any) {
    // Authentication check
    if (msg?.Authentication) {
      if (msg.Authentication === 'Success') {
      } else {
        this.cookieService.delete('session-token', '/');
      }
    } else if (msg?.GameType && msg?.RoomID) {
      this.lobbyMessage.next(msg);
    } else if (msg?.Timer || msg?.Timer === 0) {
      this.lobbyMessage.next(msg);
    } else if (msg?.Access === false && msg?.PlayerId) {
      this.router.navigateByUrl('');
    } else if (msg?.Action) {
      switch (msg.Action) {
        case 'ROLL':
        case 'MOVE':
        case 'INIT':
        case 'NEXTTURN':
        case 'GOAL':
          this.ingameMessage.next(msg);
          break;
        case 'MSG|LOBBY': {
          this.lobbyChatMessage.next(msg);
          break;
        }
        case 'MSG|TABLE': {
          this.tableChatMessage.next(msg);
          break;
        }
        default:
          console.log('SOCKET FEJL!!');
          console.log(msg);
          break;
      }
    } else {
      console.log('SOCKET FEJL1!!');
      console.log(msg);
    }
  }

  public GetLobbyData()
    :
    Observable<any> {
    return this.lobbyMessage.asObservable();
  }

  public GetSocketMessage()
    :
    Observable<GameMessage> {
    return this.ingameMessage.asObservable();
  }

  public GetLobbyChatMessage()
    :
    Observable<GameMessage> {
    return this.lobbyChatMessage.asObservable();
  }

  public GetTableChatMessage()
    :
    Observable<GameMessage> {
    return this.tableChatMessage.asObservable();
  }
}
