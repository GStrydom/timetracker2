import { Injectable } from '@angular/core';

@Injectable()
export class UserProfile {
  user = {
    userName: 'Gregory Strydom',
    userEmail: 'gregstrydom5@gmail.com',
    facebookUrl: 'https://www.facebook.com',
    twitterUrl: 'https://www.twitter.com',
    instagramUrl: 'https://www.instagram.com',
    linkedinUrl: 'https://www.linkedin.com'
  };

  constructor() {
  }

  getData(): any {
    return this.user;
  }
}
