import { Injectable } from '@angular/core';

@Injectable()
export class TransferService {

  constructor() {}

  private data;
  private tabData;

  setData(data): any{
    this.data = data;
  }

  setTabNameData(tabData): any{
    this.tabData = tabData;
  }

  getData(): any{
    const temp = this.data;
    this.clearData();
    return temp;
  }

  getTabNameData(): any{
    const temp = this.tabData;
    this.clearData();
    return temp;
  }

  clearData(): any{
    this.data = undefined;
    this.tabData = undefined;
  }
}
