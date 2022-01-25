import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { UIService } from '../../shared/ui/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  private loadingSubs: Subscription;

  constructor(private authService: AuthService, private uiService: UIService) { }

  ngOnInit(): void {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }

  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe();
  }

  onSubmit(form: NgForm): void {
    this.authService.login({
      email: form.value.email,
      password: form.value.password,
      displayName: ''
    });
    localStorage.setItem('activeSheet', '');
  }
}
