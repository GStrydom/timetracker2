import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TimesheetService } from '../timesheet/timesheet.service';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import { TransferService } from '../shared/transfer.service';

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

  constructor(private timesheetService: TimesheetService, private db: AngularFirestore, private transferService: TransferService) { }
  tasks: any[] = [
    { value: 'Connect Testing', viewValue: 'Connect Testing' },
    { value: 'Immerse Testing', viewValue: 'Immerse Testing' },
    { value: 'Break', viewValue: 'Break' },
  ];

  ngOnInit(): void {
    this.activetab = this.transferService.getTabNameData();
  }

  onSubmit(form: NgForm): any {
    this.formObj = {
      date: form.value.date,
      startTime: form.value.startTime,
      taskDescription: form.value.taskDescription,
      endTime: form.value.endTime,
      day: this.activetab,
      hoursWorked: form.value.hours
    };

    this.checkForOverwrite(this.formObj);

    console.log(this.formObj);
    this.timesheetService.createRecordOnFirestore(this.timesheetID, this.formObj);
  }

  checkForOverwrite(formObj): any {
    // Check if there is already a record for the day that matches the time.
  }
}
