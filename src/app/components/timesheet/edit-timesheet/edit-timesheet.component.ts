import { Component, OnInit } from '@angular/core';
import {TransferService} from '../../shared/transfer.service';
import {NgForm} from '@angular/forms';
import {Observable} from 'rxjs';
import {TimesheetService} from '../timesheet.service';

@Component({
  selector: 'app-edit-timesheet',
  templateUrl: './edit-timesheet.component.html',
  styleUrls: ['./edit-timesheet.component.css']
})
export class EditTimesheetComponent implements OnInit {
  record: any;
  timesheets: Observable<any>;
  formObj = {};
  selectedValue: string;

  constructor(private transferService: TransferService, private timesheetService: TimesheetService) { }
  tasks: any[] = [
    { value: 'Connect Testing', viewValue: 'Connect Testing' },
    { value: 'Immerse Testing', viewValue: 'Immerse Testing' },
    { value: 'Break', viewValue: 'Break' },
  ];

  ngOnInit(): void {
    this.record = this.transferService.getData();
  }

  onSubmit(form: NgForm): any {
    this.formObj = {
      date: form.value.date,
      startTime: form.value.startTime,
      taskDescription: form.value.taskDescription,
      endTime: form.value.endTime,
      day: this.transferService.getData(),
      hoursWorked: form.value.hours
    };
    console.log(this.formObj);
  }
}
