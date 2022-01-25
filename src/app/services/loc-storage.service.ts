import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocStorageService {

  constructor() { }

  public get(key: string): string {
    return window.localStorage.getItem(key);
  }

  public set(): void {

  }
}
