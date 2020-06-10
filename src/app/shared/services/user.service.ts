import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User} from '../models/user';
import {Observable, BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedIn: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    this.loggedIn = new BehaviorSubject<boolean>(false);
  }

  SetLoggedIn(bool: boolean) {
    this.loggedIn.next(bool);
  }

  GetLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  CreateUser(user: User) {
    return this.http.post('https://api.444.dk/api/Account', user)
      .pipe(
        map((data: any) => {
          return data;
        }));
  }

  Login(user: User) {
    return this.http.post('https://api.444.dk/api/Account/signin', user)
      .pipe(
        map((data: any) => {
          return data;
        }));
  }

  GetUser(userID: number) {
    return this.http.get('https://api.444.dk/api/Account/' + userID)
      .pipe(
        map((data: any) => {
          return data;
        }));
  }

  Verify(token: string) {
    return this.http.get('https://api.444.dk/api/Account/verify/' + token);
  }

  Renew(employeeId: number) {
    return this.http.get('https://api.444.dk/api/Account/renew/' + employeeId).pipe(
      map((data: any) => {
        return data;
      }));
  }
}
