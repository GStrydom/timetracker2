import { Component, OnInit } from '@angular/core';
import {TransferService} from '../../transfer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buttonbar',
  templateUrl: './buttonbar.component.html',
  styleUrls: ['./buttonbar.component.css']
})
export class ButtonbarComponent implements OnInit {

  constructor(private transferService: TransferService, private router: Router) { }

  ngOnInit(): void {
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
