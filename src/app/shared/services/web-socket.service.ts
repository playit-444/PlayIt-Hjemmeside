import { LobbyData } from './../models/lobbyData';
import {Injectable} from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {CookieService} from 'ngx-cookie-service';
import {BehaviorSubject, Observable} from 'rxjs';
import { GameMessage } from '../models/gameMessage';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private subject: WebSocketSubject<any>;
  private lobbyMessage: BehaviorSubject<LobbyData>;
  private ingameMessage: BehaviorSubject<GameMessage>;

  constructor(private cookieService: CookieService) {
    this.lobbyMessage = new BehaviorSubject<LobbyData>(null);
    this.subject = webSocket('wss://ws.444.dk/ws');
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
    /*console.log('Message!: ', msg);
    if (msg?.Authentication) {
      if (msg.Authentication === 'Success') {
      } else {
        this.cookieService.delete('session-token', '/');
      }
    } else if (msg as LobbyData) {
      this.lobbyMessage.next(msg);
    }
    else {
    }*/

    switch(msg) {
      case msg?.Authentication: {
        if (msg.Authentication === 'Success') {
        } else {
          this.cookieService.delete('session-token', '/');
        }
         break;
      }
      case msg as LobbyData: {
        this.lobbyMessage.next(msg);
         break;
      }
      case msg as GameMessage: {
        this.ingameMessage.next(msg);
        break;
      }
      default: {
         console.log('Someone Fucked Up...')
         break;
      }
   }
  }

  public GetLobbyData(): Observable<LobbyData>{
    return this.lobbyMessage.asObservable();
  }

  public GetSocketMessage(): Observable<GameMessage> {
    return this.ingameMessage.asObservable();
  }
}
