import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
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

  /*GetUserFromJWT(token: string) {
    console.log(token);
    return this.http.get('https://localhost:5002/api/Account/token/' + token)
      .pipe(
        map((data: any) => {
          return data;
        }));
  }*/

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
