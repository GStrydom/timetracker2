import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { TransferService } from '../shared/transfer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private transferService: TransferService) { }
  public days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  ngOnInit(): void {
    this.transferService.setTabNameData(0);
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    console.log('tabChangeEvent => ', tabChangeEvent);
    console.log('index => ', tabChangeEvent.index);
    this.transferService.setTabNameData(tabChangeEvent.index);
    localStorage.setItem('currentTab', String(tabChangeEvent.index));
  }
}
