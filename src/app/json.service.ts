import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class JSONService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  getFilteredUserCount(): Observable<any> {
    return this.http
      .get<any>('https://jsonplaceholder.typicode.com/users')
      .flatMap(array => Observable.from(array))
      .filter<any>(element => element.id % 2 == 0)
      .count();
  }

}
