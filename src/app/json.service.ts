import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class JSONService {

  constructor(private http: HttpClient) {
  }

  getAllUsers(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  getFilteredUserCount(): Observable<any> {
    return this.http
      .get<any>('https://jsonplaceholder.typicode.com/users')
      // Observable liefert ein Element, das Array, für dieses Element erzeugen wir ein Observable
      // das die wirklichen Werte einzeln enthält
      .flatMap(array => Observable.from(array))
      // erst jetzt können wir die einzelnen Elemente filtern
      .filter<any>(element => element.id % 2 == 0)
      .count();
  }

  getUserOverTime(): Observable<any> {
    let delayTime: number = 3000;
    return this.http
      .get<any>('https://jsonplaceholder.typicode.com/users')
      // Observable liefert ein Element, das Array, für dieses Element erzeugen wir ein Observable
      // das die wirklichen Werte einzeln enthält
      .flatMap(array => Observable.from(array))
      // ein "einfaches" delay würde hier das ganze Observable mit allen Werten verzögern
      // wir wollen aber die einzelnen Werte verzögern
      // zip registriert sich bei jedem der übergeben Observables und liefert, sobald ein Wert
      // geliefert wird alle Werte mit übereinstimmenden Indexen
      .zip(Observable.interval(1000), (x, intervalValue) => x)
  }

  getUserPostCount(): Observable<any> {
    return this.http
      .get<any>('https://jsonplaceholder.typicode.com/posts')
      .flatMap(array => Observable.from(array))
      // wir erzeugen basierend auf der user id GruppenObservables
      .groupBy(e => e["userId"])
      // wir warten auf jedes Gruppenobservable, zählen die Elemente die eine Gruppe liefert und erzeugen ein Objekt mit den Daten
      .flatMap(group => group
        .count()
        .map(total => ({ UserId: group.key, Count: total }))
      )
      // die einzelnen Werte nicht nacheinander liefern sondern alle zusammen als array
      .toArray()
  }

  getUsersAndPosts() {
    let users = this.http.get('https://jsonplaceholder.typicode.com/users');
    let posts = this.http.get('https://jsonplaceholder.typicode.com/posts');

    return Observable.merge(users, posts).toArray();
  }

  getUserDataPlusPostCount() {
    let users = this.http.get<any>('https://jsonplaceholder.typicode.com/users');
    let posts = this.http.get<any>('https://jsonplaceholder.typicode.com/posts');

    return Observable
      .merge(users, posts)
      .last()
      .flatMap(e => Observable.from(e))
      .do(e => e["postCount"] = posts.toArray().filter(p => p["userId"] == e["userId"]).count())
      .do(e => console.log(e))
      .toArray();
  }



}
