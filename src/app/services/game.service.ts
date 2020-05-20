import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) {
  }

  GetGameType() {
    return this.http.get('https://api.444.dk/api/GameType')
      .pipe(
        map((data: any) => {
          return data;
        }));
  }

  GetTables(id) {
    return this.http.get('https://api.444.dk/api/Game/' + id)
      .pipe(
        map((data: any) => {
          return data;
        }));
  }
}
