import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TimesheetService } from '../timesheet/timesheet.service';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import { TransferService } from '../shared/transfer.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { UserModel } from '../auth/user.model';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class NewRecordComponent implements OnInit {
  timesheets: Observable<any>;
  formObj = {};
  selectedValue: string;
  timesheetID = '';
  activetab: any;
  timesheetRecords;
  userId;

  constructor(private timesheetService: TimesheetService, private db: AngularFirestore, private transferService: TransferService, private afAuth: AngularFireAuth) { }
  tasks: any[] = [
    { value: 'Connect Testing', viewValue: 'Connect Testing' },
    { value: 'Immerse Testing', viewValue: 'Immerse Testing' },
    { value: 'Break', viewValue: 'Break' },
  ];

  ngOnInit(): void {
    this.getData();
    // this.activetab = this.transferService.getTabNameData();
    this.activetab = localStorage.getItem('currentTab');
    switch (this.activetab) {
      case '0': {
        this.activetab = 'Monday';
        break;
      }
      case '1': {
        this.activetab = 'Tuesday';
        break;
      }
      case '2': {
        this.activetab = 'Wednesday';
        break;
      }
      case '3': {
        this.activetab = 'Thursday';
        break;
      }
      case '4': {
        this.activetab = 'Friday';
        break;
      }
    }
  }

  // tslint:disable-next-line:typedef
  async getData() {
    this.timesheetRecords = await this.timesheetService.getTimeSheetRecords();
  }

  onSubmit(form: NgForm): any {
    this.afAuth.currentUser.then((user) => {
      this.userId = user.uid;

      this.timesheetRecords.subscribe(result => {
        // tslint:disable-next-line:prefer-for-of
        for (let doc = 0; doc < result.length; doc++) {
          if (result[doc].startTime === form.value.startTime.toLocaleTimeString()) {
            alert('A record with this start time already exists.');
            return;
          } else {
            this.formObj = {
              date: new Date().toDateString(),
              startTime: form.value.startTime.toLocaleTimeString(),
              taskDescription: form.value.taskDescription,
              endTime: form.value.endTime.toLocaleTimeString(),
              day: this.activetab,
              hoursWorked: form.value.hoursWorked,
              uid: this.userId
            };

            console.log(this.formObj);
          }
        }
      });
    });
    // this.timesheetService.createRecordOnFirestore(this.timesheetID, this.formObj);
  }
}
