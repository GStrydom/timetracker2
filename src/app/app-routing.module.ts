import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './components/auth/auth.guard';
import { NewRecordComponent } from './components/record/record.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { EditTimesheetComponent } from './components/timesheet/edit-timesheet/edit-timesheet.component';
import { CreateTimesheetComponent } from './components/timesheet/create-timesheet/create-timesheet.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard]},
  { path: 'new-timesheet', component: NewRecordComponent, canActivate: [AuthGuard] },
  { path: 'edit-timesheet', component: EditTimesheetComponent, canActivate: [AuthGuard] },
  { path: 'create-timesheet', component: CreateTimesheetComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
