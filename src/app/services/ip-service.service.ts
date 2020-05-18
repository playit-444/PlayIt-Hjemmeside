import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IpServiceService {

  constructor(private http: HttpClient) {
  }

  public getIPAddress() {
    return this.http.get('https://api.ipify.org/?format=json')
      .pipe(
        map((data: any) => {
          return data;
        }));
    // return this.http.get('https://api.ipify.org/?format=json');
  }
}
