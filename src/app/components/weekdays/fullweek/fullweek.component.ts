import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { Timesheet } from '../../timesheet/timesheet.model';
import { TimesheetService } from '../../timesheet/timesheet.service';
import { Totals } from '../../timesheet/totals.models';
import * as XLSX from 'xlsx';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-fullweek',
  templateUrl: './fullweek.component.html',
  styleUrls: ['./fullweek.component.css']
})
export class FullweekComponent implements OnInit {
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

  @ViewChild('TABLE') table: ElementRef;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private timesheetService: TimesheetService, private afAuth: AngularFireAuth) { }

  // tslint:disable-next-line:typedef
  async ngOnInit() {
    this.timesheetRecords = await this.getData();
    this.setupWeek();
  }

  // tslint:disable-next-line:typedef
  async getData() {
    let records;
    records = await this.timesheetService.getTimeSheetRecords();
    return records;
  }

  // tslint:disable-next-line:typedef
  setupWeek() {
    this.afAuth.currentUser.then((user) => {
      this.user = user.uid;
    });

    this.timesheetRecords.subscribe(result => {
      // tslint:disable-next-line:prefer-for-of
      for (let doc = 0; doc < result.length; doc++) {
        if (result[doc].uid === this.user) {
          // tslint:disable-next-line:radix
          this.hours += parseInt(result[doc].hoursWorked);
          this.records.push(result[doc]);
        }
      }

      this.amount = this.hours * this.rate;
      this.totals.push({totalHours: this.hours, amount: 'R ' + this.amount + '.00'});

      this.mainDatasource.data = this.records;
      this.totalDatasource.data = this.totals;

      this.mainDatasource.sort = this.sort;
    });
  }

  exportAsExcel(): any {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'Timesheet.xlsx');
  }

  editRecord(element): any {
    console.log(element);
  }

  deleteRecord(element): any {
    console.log(element);
  }

}
