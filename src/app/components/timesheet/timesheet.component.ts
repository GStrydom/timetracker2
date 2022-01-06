import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Timesheet } from './timesheet.model';
import { TimesheetService } from './timesheet.service';
import { Totals } from './totals.models';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { TransferService } from '../shared/transfer.service';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {
  constructor(private timesheetService: TimesheetService) { }

  ngOnInit(): void {
  }
}
