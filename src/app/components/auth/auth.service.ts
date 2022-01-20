import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UIService } from '../shared/ui/ui.service';
import { TransferService } from '../shared/transfer.service';
import { UserModel } from './user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(private uiService: UIService, private router: Router, private auth: AngularFireAuth, public snackBar: MatSnackBar, private transferService: TransferService, private afs: AngularFirestore) {}

  // tslint:disable-next-line:typedef
  initAuthListener() {
     this.auth.authState.subscribe(user => {
       if (user) {
         this.isAuthenticated = true;
         this.authChange.next(true);
         this.router.navigate(['/welcome']).then();
       } else {
         this.snackBar.open('You have been logged out. See you later!', null, {duration: 3000});
         this.isAuthenticated = false;
         this.authChange.next(false);
         this.router.navigate(['/login']).then();
       }
     });
  }

  // tslint:disable-next-line:typedef
  async registerUser(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    try {
      const resp = await this.auth.createUserWithEmailAndPassword(authData.email, authData.password);
      await resp.user.updateProfile({ displayName: `${ (authData.displayName) }`});
      this.uiService.loadingStateChanged.next(false);
      this.authChange.next(true);
      await this.createUserDocument();
      await this.router.navigate(['/home']);
    } catch (error) {
      this.uiService.loadingStateChanged.next(false);
      console.log(error.message);
      this.snackBar.open(error.message, null, {duration: 3000});
    }
  }

  // tslint:disable-next-line:typedef
  async login(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    try {
      await this.auth.signInWithEmailAndPassword(authData.email, authData.password);
      this.snackBar.open('Login success! Welcome back :)', null, {duration: 3000});
      this.uiService.loadingStateChanged.next(false);
    } catch (error) {
      this.uiService.loadingStateChanged.next(false);
      console.log(error.message());
      this.snackBar.open(error.message, null, {duration: 3000});
    }
  }

  // tslint:disable-next-line:typedef
  logout() {
    this.auth.signOut().then();
  }

  // tslint:disable-next-line:typedef
  isAuth() {
    return this.isAuthenticated;
  }

  // tslint:disable-next-line:typedef
  createUserDocument() {
    // Get user
    this.auth.currentUser.then((user) => {
      // Create object with data
      const userProfile: UserModel = {
        uid: user.uid,
        email: user.email,
        username: user.displayName,
        role: '',
        linkedinURL: '',
        facebookURL: '',
        twitterURL: '',
        instagramURL: ''
      };

      // Write to firestore
      return this.afs.doc(`users/${user.uid}`).set(userProfile);
    });
  }
}
