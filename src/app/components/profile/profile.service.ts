import { Injectable } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { UserModel } from '../auth/user.model';
import {AngularFireAuth} from '@angular/fire/compat/auth';

@Injectable()
export class UserProfile {
  private itemDoc: AngularFirestoreDocument<UserModel>;
  item: Observable<UserModel>;

  constructor(public afAuth: AngularFireAuth, public afs: AngularFirestore) {
  }

  // tslint:disable-next-line:typedef
  getData() {
    this.afAuth.currentUser.then((user) => {
      this.itemDoc = this.afs.doc<UserModel>(`users/${user.uid}`);
      this.item = this.itemDoc.valueChanges();
    });
    return this.item;
  }
}
