import { Timesheet } from './timesheet.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable()
export class TimesheetService {
  finishedTimesheets: Timesheet[];
  userID: any;

  constructor(private db: AngularFirestore) {
  }

  addTimesheetToFirestore(timesheetData): any {
    this.db.collection('collectionList').add(timesheetData).then();
  }

  createRecordOnFirestore(timesheet, timesheetData): any {
    this.db.collection(timesheet).add(timesheetData).then();
  }

  getTimeSheetRecords(): any{
    const activeTimesheet = localStorage.getItem('activeSheet');
    return this.db.collection(activeTimesheet).get();
  }

  editRecordOnFirestore(timesheet): any {

  }

  deleteRecordOnFirestore(timesheet): any {

  }

  getCollectionList(): any {
    return this.db.collection('collectionList').get();
  }
}
