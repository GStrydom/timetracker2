import {Component, EventEmitter, Output, OnInit, OnDestroy} from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { Subscription } from 'rxjs';
import { TransferService } from '../../transfer.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Output() sideNavToggle = new EventEmitter<void>();
  isAuth: boolean;
  authSubscription: Subscription;
  public userDisplayName;

  constructor(private authService: AuthService, private transferService: TransferService, private router: Router, private afAuth: AngularFireAuth) { }

  // tslint:disable-next-line:typedef
  async ngOnInit() {
    this.authSubscription = await this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
    this.userDisplayName = await this.getUserData();
  }

  // tslint:disable-next-line:typedef
  async getUserData() {
    let uname;
    await this.afAuth.currentUser.then((user) => {
      if (user) {
        uname = user.uid;
      }
    });
    return uname;
  }

  ngOnDestroy(): any {
    this.authSubscription.unsubscribe();
  }

  onSidenav(): any {
    this.sideNavToggle.emit();
  }

  onLogout(): any {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
