import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../environments/environment';
import { catchError, tap, switchAll, retryWhen, delayWhen } from 'rxjs/operators';
import { EMPTY, Subject, timer, Observable } from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private subject: WebSocketSubject<any>;
  private messagesSubject$ = new Subject();
  public messages$ = this.messagesSubject$.pipe(switchAll(), catchError(e => { throw e }));



  constructor(private cookieService: CookieService) {

    this.subject = webSocket('wss://localhost:5001/ws');
    //this.subject = webSocket('wss://echo.websocket.org');

    this.sendMessage(this.cookieService.get('session-token'));


    this.subject.subscribe(
      msg => console.log('message received: ' + msg), // Called whenever there is a message from the server.
      err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      () => console.log('complete') // Called when connection is closed (for whatever reason).
    );
  }

  sendMessage(msg: any) {
    this.subject.next(msg);
  }

  close() {
    this.subject.complete();
  }
}
