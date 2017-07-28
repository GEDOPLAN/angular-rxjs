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

  getUserOverTime(): Observable<any> {
    let delayTime: number = 3000;
    return this.http
      .get<any>('https://jsonplaceholder.typicode.com/users')
      .flatMap(array => Observable.from(array))
      .zip(Observable.interval(1000), (x) => x)
  }

  getUserPostCount(): Observable<any> {
    return this.http
      .get<any>('https://jsonplaceholder.typicode.com/posts')
      .flatMap(array => Observable.from(array))
      .groupBy(e => e["userId"])
      .do( e => console.log(e))
      .flatMap(group => group
        .count()
        .map(total => ({ UserId: group.key, Count: total }))
      )
      .toArray()
  }


}
