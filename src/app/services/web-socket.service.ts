import {Injectable} from '@angular/core';
import {webSocket} from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  subject: any;

  constructor() {
    this.subject = webSocket('wss://localhost:5001/ws');
  }

  public sendToServer() {
    this.subject.subscribe();
    this.subject.next('hejsa');
    this.subject.complete();
  }
}
