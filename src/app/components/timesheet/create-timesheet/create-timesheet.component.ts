import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm} from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { TimesheetService } from '../timesheet.service';
import { Router } from '@angular/router';
import { TransferService } from '../../shared/transfer.service';
import { CreateTimeSheet } from './create-timesheet.model';
import * as moment from 'moment';
import { Moment } from 'moment';

@Component({
  selector: 'app-create-timesheet',
  templateUrl: './create-timesheet.component.html',
  styleUrls: ['./create-timesheet.component.css']
})
export class CreateTimesheetComponent implements OnInit {
  public items = [];
  public timesheetData: CreateTimeSheet;
  public resultLength;
  public startDate;
  public endDate;
  public month;
  public selected: { startDate: Moment, endDate: Moment };

  public ranges: any = {
    'Next 7 Days': [moment().add(6, 'days'), moment()],
  };

  public tooltips = [
    { date: moment(), text: 'Today is just unselectable' },
    { date: moment().add(2, 'days'), text: 'Yes' }
  ];

  public range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(private db: AngularFirestore, private timesheetService: TimesheetService, private router: Router, private transferService: TransferService) { }

  ngOnInit(): void {
    this.getData();
  }

  onSubmit(form: NgForm): any {
    this.setMonth(this.startDate);
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    const dateTime = date + ' ' + time;

    this.timesheetData = {
      timesheetID: 'timesheet_' + this.resultLength.docs.length.toString(),
      userID: localStorage.getItem('userEmail'),
      dateCreated: dateTime,
      name: form.value.tname,
      startDate: this.startDate,
      endDate: this.endDate,
      month: this.month
    };

    if (this.checkTimeSheetExists(this.timesheetData)) {
      alert('A time sheet with this name already exists. Please open that timesheet, or create a new one.');
    } else {
      this.timesheetService.addTimesheetToFirestore(this.timesheetData);
      this.timesheetService.createRecordOnFirestore(this.timesheetData[`timesheetID`], {});
      localStorage.setItem('activeSheet', this.timesheetData[`timesheetID`]);
      this.router.navigate(['/home']).then();
    }
  }

  getData(): any {
    this.timesheetService.getCollectionList().subscribe(result => {
      this.resultLength = result;
    });
  }

  onChange(startDate: HTMLInputElement, endDate: HTMLInputElement): any {
    this.startDate = startDate.value;
    this.endDate = endDate.value;
  }

  rangeClicked(event): any {
    console.log(event);
  }

  checkTimeSheetExists(newSheet): any {
    this.resultLength.docs.forEach((doc) => {
      if (newSheet.startDate === doc.startDate && newSheet.endDate === doc.endDate) {
        console.log('Timesheet exists');
        return true;
      } else {
        console.log('Match not found');
        return false;
      }
    });
  }

   setMonth(startDate): any {
    const str = startDate.substr(1, 2);
    if (str.substr(1, 1) === '/') {
      console.log('Single digit month');
    }
  }
}
