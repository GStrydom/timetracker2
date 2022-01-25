import {Component, AfterViewInit, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
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
import { AngularFireAuth } from '@angular/fire/compat/auth';
// import {UserModel} from '../../auth/user.model';

declare let Email: any;

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit, AfterViewInit {
  public mainColumns = ['date', 'startTime', 'taskDescription', 'endTime', 'hoursWorked', 'edit', 'delete'];
  public totalColumns = ['totalHours', 'amount'];
  public mainDatasource = new MatTableDataSource<Timesheet>();
  public totalDatasource = new MatTableDataSource<Totals>();
  public timesheetRecords;
  public records = [];
  public totals = [];
  public hours = 0;
  public rate = 95;
  public amount = 0;
  public timesheet = '';
  public user;
  public buttonsDisabled = false;

  @ViewChild('TABLE') table: ElementRef;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @Input()
  day: string;

  constructor(private timesheetService: TimesheetService, private router: Router, private transferService: TransferService, public afAuth: AngularFireAuth) { }

  // tslint:disable-next-line:typedef
  async ngOnInit() {
      this.timesheetRecords = await this.getData();
      this.setupDay();
  }

  // tslint:disable-next-line:typedef
  async getData() {
    if (localStorage.getItem('activeSheet') === '') {
      alert('Please select a timesheet or create a new one to add records.');
      await this.router.navigate(['/welcome']);
    } else {
      let records;
      records = await this.timesheetService.getTimeSheetRecords();
      return records;
    }
  }

  // tslint:disable-next-line:typedef
  setupDay() {
    this.afAuth.currentUser.then((user) => {
      this.user = user.uid;
    });
    this.timesheetRecords.subscribe(result => {
      // tslint:disable-next-line:prefer-for-of
      for (let doc = 0; doc < result.length; doc++) {
        if (result[doc].uid === this.user) {
          if (result[doc].day === undefined) {
            // console.log('Initial Found. No records found.');
            return;
          } else {
            if (result[doc].day === this.day) {
              // console.log('A record was found.');
              // tslint:disable-next-line:radix
              this.hours += parseInt(result[doc].hoursWorked);
              this.records.push(result[doc]);
            } else {
              // console.log('Day not known');
            }
          }
        } else {
          this.buttonsDisabled = true;
          return;
        }
      }

      this.amount = this.hours * this.rate;
      this.totals.push({totalHours: this.hours, amount: 'R ' + this.amount + '.00'});

      this.mainDatasource.data = this.records;
      this.totalDatasource.data = this.totals;
    });
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
      this.router.navigate(['/new-record']).then();
    }
  }

  ngAfterViewInit(): void {
    // Google yes.
  }
}
