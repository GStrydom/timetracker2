import { Component, OnInit } from '@angular/core';
import { UserProfile } from './profile.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditprofiledialogComponent } from './editprofiledialog/editprofiledialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileData: any;

  constructor(private profile: UserProfile, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.profileData = this.profile.getData();
  }

  openDialog(): any {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      userName: 'Gregory Strydom',
      userEmail: 'gregory.strydom079@gmail.com',
      facebookUrl: 'https://www.facebook.com',
      twitterUrl: 'https://www.twitter.com',
      instagramUrl: 'https://www.instagram.com',
      linkedinUrl: 'https://www.linkedin.com'
    };

    this.dialog.open(EditprofiledialogComponent, dialogConfig);
  }
}
