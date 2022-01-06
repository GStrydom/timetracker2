import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Timesheet} from '../../timesheet/timesheet.model';
import {TimesheetService} from '../../timesheet/timesheet.service';
import {Totals} from '../../timesheet/totals.models';
import * as XLSX from 'xlsx';
import {Router} from '@angular/router';
import {TransferService} from '../../shared/transfer.service';

import '../../../../assets/smtp.js';

declare let Email: any;

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit, AfterViewInit {
  public mainColumns = ['date', 'startTime', 'taskDescription', 'endTime', 'hoursWorked', 'edit', 'delete'];
  public totalColumns = ['totalHours', 'amount'];
  public mainDatasource: MatTableDataSource<Timesheet>;
  public totalDatasource: MatTableDataSource<Totals>;
  public timesheetRecords;
  public records = [];
  public totals = [];
  public hours = 0;
  public rate = 95.00;
  public amount: any;
  public timesheet = '';

  @ViewChild('TABLE') table: ElementRef;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @Input()
  day: string;

  constructor(private timesheetService: TimesheetService, private router: Router, private transferService: TransferService) { }

  // tslint:disable-next-line:typedef
  async ngOnInit() {
    // this.timesheet = this.getActiveTimesheet();
    this.timesheetRecords = await this.getData();
    console.log(this.timesheetRecords);

    // tslint:disable-next-line:prefer-for-of
    // for (let doc = 0; doc < this.timesheetRecords.length; doc++) {
    //     if (this.timesheetRecords[doc].day === undefined) {
    //       console.log('Initial Found. No records found.');
    //       return;
    //     } else {
    //       if (this.timesheetRecords[doc].day === 'Monday') {
    //         console.log('A record was found.');
    //         // tslint:disable-next-line:radix
    //         this.hours += parseInt(this.timesheetRecords[doc].hoursWorked);
    //         if (this.timesheetRecords[doc].taskDescription === 'Break') {
    //           this.hours -= 1;
    //         }
    //         this.records.push(this.timesheetRecords[doc]);
    //       } else {
    //         console.log('Day not known');
    //       }
    //     }
    //     this.timesheetRecords.push(this.timesheetRecords[doc]);
    //   }
    // this.setupDay();
    // SharedModule.setupDay(this.timesheetRecords, this.hours, 'Monday');
  }

  ngAfterViewInit(): any {
    // this.setupDay();
  }

  // tslint:disable-next-line:typedef
  async fetchData() {
    const data = [];
    this.timesheetService.getTimeSheetRecords().subscribe(result => {
      result.docs.forEach((doc) => {
        data.push(doc.data());
      });
      return data;
    });
  }

  // tslint:disable-next-line:typedef
  async getData() {
    const data = await this.fetchData();
    return data;
  }

  async exportAsExcel(): Promise<any> {
    if (this.checkBeforeExport('timesheet')) {
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      /* save to file */
      XLSX.writeFile(wb, 'Timesheet.xlsx');
    }
  }

  async emailToAdmin(): Promise<any> {
    if (this.checkBeforeEmail()) {
      Email.send({
        Host: 'smtp.elasticemail.com',
        Username: 'gregstrydom5@gmail.com',
        Password: 'BFF36BE0713DCAF828E4C2CD48F77B968528',
        To : 'gregory.strydom079@gmail.com',
        From : 'gregstrydom5@gmail.com',
        Subject : 'This is the subject',
        Body : 'And this is the body',
        Attachments : [
          {

          }]
      }).then(
        message => alert(message)
      );
    }
  }

  async editRecord(element): Promise<any> {
    this.transferService.setData(element);
    this.router.navigate(['edit-timesheet']).then();
  }

  async deleteRecord(element): Promise<any> {
    const answer = confirm('Are you sure you would like to delete this record?');
    if (answer) {
      this.timesheetService.deleteRecordOnFirestore(element);
    }
  }

  checkBeforeExport(method): any {
    const temp = this.transferService.getData();
    if (temp === 'true') {
      alert('Please create a' + method + 'before trying to export.');
    } else {
      return true;
    }
  }

  checkBeforeEmail(): any {
    const temp = this.transferService.getData();
    if (temp === 'true') {
      alert('Please create at least one record before trying to email your timesheet.');
    } else {
      return true;
    }
  }

  checkTable(): any {
    const temp = this.transferService.getData();
    if (temp === 'true') {
      alert('Please create a timesheet before trying to add a record.');
    } else {
      this.router.navigate(['/new-timesheet']).then();
    }
  }
}
