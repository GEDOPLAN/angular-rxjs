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

  userOverTime: any[] = []

  userPostCount: any[];

  usersAndPosts: any;

  userDataPostCount: any[]

  ngOnInit() {
    this.service.getAllUsers().subscribe(r => this.allUsers = r);
    this.service.getFilteredUserCount().subscribe(r => { this.filterUsers1 = r });
    this.service.getUserOverTime().subscribe(r => { this.userOverTime.push(r) });
    this.service.getUserPostCount().subscribe(r => { this.userPostCount = r });
    this.service.getUsersAndPosts().subscribe(r => { this.usersAndPosts = r });
    this.service.getUserDataPlusPostCount().subscribe(r => { this.userDataPostCount = r });
  
  }


}
