import { Injectable } from '@angular/core';

@Injectable()
export  class UserProfile {
  user = {
    userName: 'Gregory Strydom',
    userEmail: 'gregstrydom5@gmail.com'
  };
  constructor() {
  }

  getData(): any {
    return this.user;
  }
}
