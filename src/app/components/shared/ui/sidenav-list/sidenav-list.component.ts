import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSideNav = new EventEmitter<void>();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onClose(): void {
    this.closeSideNav.emit();
  }

  onLogout() {
    this.onClose();
    this.authService.logout();
  }

}
