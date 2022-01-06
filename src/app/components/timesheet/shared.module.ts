export class SharedModule {
  constructor() {
  }

  static setupDay(timesheetRecords: any[], hours: number, day: string): any {
    console.log(timesheetRecords);
    timesheetRecords.forEach((doc) => {
      if (doc.data().day === undefined) {
        console.log('Initial Found');
      } else {
        timesheetRecords.push(doc.data());
        console.log(timesheetRecords);
      }
      timesheetRecords.push(doc.data());
    });
    for (const record of timesheetRecords) {
      if (record.day === day) {
        // tslint:disable-next-line:radix
        hours += parseInt(record.hoursWorked);
        if (record.taskDescription === 'Break') {
          hours -= 1;
        }
      }
    }
  }
}

