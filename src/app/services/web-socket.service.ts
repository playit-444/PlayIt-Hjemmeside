import {Injectable} from '@angular/core';
import {webSocket} from 'rxjs/webSocket';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  subject: any;

  constructor(private cookieService: CookieService) {
    this.subject = webSocket('wss://localhost:5001/ws');
  }

  public sendToServer() {
    this.subject.subscribe();
    this.subject.next(this.cookieService.get('session-token'));
    this.subject.complete();
  }
}
