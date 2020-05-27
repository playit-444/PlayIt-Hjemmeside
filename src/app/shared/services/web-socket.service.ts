import { LobbyData } from './../models/lobbyData';
import {Injectable} from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {CookieService} from 'ngx-cookie-service';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private subject: WebSocketSubject<any>;
  private lobbyMessage: BehaviorSubject<LobbyData>;

  constructor(private cookieService: CookieService) {
    this.lobbyMessage = new BehaviorSubject<LobbyData>(null);
    this.subject = webSocket('wss://localhost:5001/ws');
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
    console.log('Message!: ', msg);
    if (msg?.Authentication) {
      if (msg.Authentication === 'Success') {
      } else {
        this.cookieService.delete('session-token', '/');
      }
    } else if (msg as LobbyData) {
      console.log('recieved message: ', msg);
      this.lobbyMessage.next(msg);
    }
    else {
      console.log('h');
      console.log();
      console.log('h');
    }
  }

  public GetLobbyData(): Observable<LobbyData>{
    console.log('GetLobbyData');
    return this.lobbyMessage.asObservable();
  }
}
