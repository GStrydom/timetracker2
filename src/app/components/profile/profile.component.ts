import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditprofiledialogComponent } from './editprofiledialog/editprofiledialog.component';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { UserModel } from '../auth/user.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private itemDoc: AngularFirestoreDocument<UserModel>;
  item: Observable<UserModel>;

  constructor(private dialog: MatDialog, public afAuth: AngularFireAuth, public afs: AngularFirestore) { }
  public totalSheets;
  public recentSheet;

  ngOnInit(): void {
    this.afAuth.currentUser.then((user) => {
      this.itemDoc = this.afs.doc<UserModel>(`users/${user.uid}`);
      this.item = this.itemDoc.valueChanges();
    });
    this.getTotalSheets();
    this.getRecentSheet();
  }

  openDialog(): any {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      userName: 'this.item.displayName',
      userEmail: 'this.item.email',
      facebookUrl: 'this.item.facebookURL',
      twitterUrl: 'this.item.twitterURL',
      instagramUrl: 'this.item.instagramURL',
      linkedinUrl: 'this.item.linkedinURL'
    };

    this.dialog.open(EditprofiledialogComponent, dialogConfig);
  }

  getTotalSheets(): any {
    this.totalSheets = 12;
  }

  getRecentSheet(): any {
    this.recentSheet = 'Greg Timesheet 06/09/21 - 10/09/21';
  }

  // tslint:disable-next-line:typedef
  fileChange(event) {
    // Todo
  }
}
