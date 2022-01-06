import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UIService } from '../shared/ui/ui.service';
import {TransferService} from '../shared/transfer.service';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(private router: Router, private auth: AngularFireAuth, public snackBar: MatSnackBar, private uiService: UIService, private transferService: TransferService) {}

  async initAuthListener(): Promise<any> {
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

  registerUser(authData: AuthData): any {
    this.uiService.loadingStateChanged.next(true);
    this.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.uiService.loadingStateChanged.next(false);
        this.authChange.next(true);
        this.router.navigate(['/home']).then();
        result.user.updateProfile({
          displayName: authData.displayName
        }).then();
      }).catch(error => {
        this.uiService.loadingStateChanged.next(false);
        console.log(error.message);
        this.snackBar.open(error.message, null, {duration: 3000});
    });
  }

  login(authData: AuthData): any {
    this.uiService.loadingStateChanged.next(true);
    this.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.uiService.loadingStateChanged.next(false);
        this.snackBar.open('Login success! Welcome back :)', null, {duration: 3000});
        localStorage.setItem('userName', result.user.displayName);
        localStorage.setItem('userEmail', authData.email);
        this.router.navigate(['/welcome']).then();
    }).catch(error => {
      this.uiService.loadingStateChanged.next(false);
      console.log(error.message);
      this.snackBar.open(error.message, null, {duration: 3000});
    });
  }

  logout(): any {
    this.auth.signOut().then();
  }

  isAuth(): any {
    return this.isAuthenticated;
  }
}
