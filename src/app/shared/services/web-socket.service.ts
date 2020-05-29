import {LobbyData} from './../models/lobbyData';
import {Injectable} from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {CookieService} from 'ngx-cookie-service';
import {BehaviorSubject, Observable} from 'rxjs';
import {GameMessage} from '../models/gameMessage';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private subject: WebSocketSubject<any>;
  private lobbyMessage: BehaviorSubject<LobbyData>;
  private ingameMessage: BehaviorSubject<GameMessage>;
  private lobbyChatMessage: BehaviorSubject<GameMessage>;

  constructor(private cookieService: CookieService) {
    this.lobbyMessage = new BehaviorSubject<LobbyData>(null);
    this.lobbyChatMessage = new BehaviorSubject<GameMessage>(null);
     this.subject = webSocket('wss://ws.444.dk/ws');
    // this.subject = webSocket('wss://localhost:5001/ws');
    this.sendMessage(this.cookieService.get('session-token'));

    this.subject.subscribe(
      msg => this.readMessage(msg), // Called whenever there is a message from the server.
      err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      () => console.log('complete') // Called when connection is closed (for whatever reason).
    );
  }

  sendMessage(msg: any) {
    console.log('Sending message: ', msg)
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
    } else if (msg?.Action) {
      switch (msg.Action) {
        case 'ROLL' || 'MOVE' || 'INIT': {
          this.ingameMessage.next(msg);
          break;
        }
        case 'MSG': {
          this.lobbyChatMessage.next(msg);
          break;
        }
        default:
          console.log('SOCKET FEJL!!');
          console.log(msg);
          break;
      }


    }
  }

  public GetLobbyData()
    :
    Observable<LobbyData> {
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
}
