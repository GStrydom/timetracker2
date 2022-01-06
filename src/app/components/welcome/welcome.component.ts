import { Component, OnInit } from '@angular/core';
import { TimesheetService } from '../timesheet/timesheet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  timesheetNames = [];

  constructor(private timesheetService: TimesheetService, private router: Router) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): any {
    this.timesheetService.getCollectionList().subscribe(result => {
      result.docs.forEach((doc) => {
        if (doc.data().timesheetID !== 'timesheet_0') {
          this.timesheetNames.push(doc.data());
        }
      });
    });
  }

  openTimeSheet(timeSheetName): any {
    localStorage.setItem('activeSheet', timeSheetName.timesheetID);
    console.log('ON WELCOME: The active sheet timesheetID is ' + timeSheetName.timesheetID);
    this.router.navigate(['/home']).then();
  }

  deleteTimeSheet(timesheetName): any {
    console.log('Deleted');
  }
}
