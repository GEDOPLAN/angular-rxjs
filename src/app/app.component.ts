import { JSONService } from './json.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    JSONService
  ]
})
export class AppComponent {

  constructor(public service: JSONService) { }

  allUsers: any[];

  filterUsers1: any;

  ngOnInit() {
    this.service.getAllUsers().subscribe(r => this.allUsers = r);
    this.service.getFilteredUserCount().subscribe(r => {console.log(r);this.filterUsers1 = r});
  }


}
