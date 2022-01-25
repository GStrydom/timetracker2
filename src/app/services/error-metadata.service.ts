import { Injectable } from '@angular/core';
import { ErrorHandler } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorMetadataService implements ErrorHandler{
  public handleError(error: any): void {
    const date = new Date();
    console.error({
      timeStamp: date.toISOString(),
      message: error.message,
      zone: error.zone
    });
  }
}
