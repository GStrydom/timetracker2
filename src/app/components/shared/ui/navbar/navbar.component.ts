import {Component, EventEmitter, Output, OnInit, OnDestroy} from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { Subscription } from 'rxjs';
import {TransferService} from '../../transfer.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Output() sideNavToggle = new EventEmitter<void>();
  isAuth: boolean;
  authSubscription: Subscription;
  userDisplayName: string = localStorage.getItem('userName');

  constructor(private authService: AuthService, private transferService: TransferService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  ngOnDestroy(): any {
    this.authSubscription.unsubscribe();
  }

  onSidenav(): any {
    this.sideNavToggle.emit();
  }

  onLogout(): any {
    this.authService.logout();
  }

}
