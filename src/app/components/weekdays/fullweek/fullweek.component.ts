import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { Timesheet } from '../../timesheet/timesheet.model';
import { TimesheetService } from '../../timesheet/timesheet.service';
import { Totals } from '../../timesheet/totals.models';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-fullweek',
  templateUrl: './fullweek.component.html',
  styleUrls: ['./fullweek.component.css']
})
export class FullweekComponent implements OnInit {
  mainColumns = ['date', 'startTime', 'taskDescription', 'endTime', 'hoursWorked', 'edit', 'delete'];
  totalColumns = ['totalHours', 'amount'];
  mainDatasource: MatTableDataSource<Timesheet>;
  totalDatasource: MatTableDataSource<Totals>;
  daysTimesheet = [];
  totals = [];
  hours = 0;
  rate = 95.00;
  amount: any = 0;

  @ViewChild('TABLE') table: ElementRef;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private timesheetService: TimesheetService) { }

  ngOnInit(): void {
    this.timesheetService.getTimeSheetRecords().subscribe(result => {
      for (let x = 0; x < result.length; x++) {
        this.hours += parseInt(result[x].hoursWorked);
        if (result[x].taskDescription === 'Break') {
          this.hours -= 1;
        }
        this.daysTimesheet.push(result[x]);
      }
      this.amount = this.hours * this.rate;
      this.amount = 'R ' + this.amount.toString() + '.00';
      this.totals.push({totalHours: this.hours, amount: this.amount});
      this.mainDatasource = new MatTableDataSource(this.daysTimesheet);
      this.totalDatasource = new MatTableDataSource(this.totals);

      this.sort.sort(({ id: 'date', start: 'asc'}) as MatSortable);
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
