import { Component, OnInit } from '@angular/core';
import { TimesheetService } from '../timesheet/timesheet.service';
import { Router } from '@angular/router';
import {AngularFireAuth} from '@angular/fire/compat/auth';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  timesheets = [];
  public user;

  constructor(private timesheetService: TimesheetService, private router: Router, private afAuth: AngularFireAuth) { }

  // tslint:disable-next-line:typedef
  async ngOnInit() {
    await this.afAuth.currentUser.then((user) => {
      this.user = user.uid;
    });

    await this.getData();
    this.setup();
  }

  // tslint:disable-next-line:typedef
  async getData() {
    await this.timesheetService.getCollectionList().subscribe(result => {
      result.docs.forEach((doc) => {
        if (doc.data().uid === this.user) {
          this.timesheets.push(doc.data());
        }
      });
    });
  }

  // tslint:disable-next-line:typedef
  setup() {
    // ToDo
  }

  openTimeSheet(timeSheetName): any {
    localStorage.setItem('activeSheet', timeSheetName.timesheetID);
    // console.log('ON WELCOME: The active sheet timesheetID is ' + timeSheetName.timesheetID);
    this.router.navigate(['/home']).then();
  }

  deleteTimeSheet(timesheetName): any {
    console.log('Deleted');
  }
}
