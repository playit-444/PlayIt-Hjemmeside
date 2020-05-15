import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from "rxjs/operators";
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  CreateUser(user: User) {
    return this.http.post("https://api.444.dk/api/Account", user)
      .pipe(
        map((data: any) => {
            return data;
        }));
  }

}
