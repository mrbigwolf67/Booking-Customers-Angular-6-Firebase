import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminHomeComponent } from '../auth/admin-home/admin-home.component';
import { BookingComponent } from '../booking/booking.component';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../auth/login/login.component';
import { AuthGuard } from '../auth/auth.guard';
import { AdminConfirmedComponent } from '../auth/admin-confirmed/admin-confirmed.component';
import { AdminConfirmedDetailComponent } from '../auth/admin-confirmed-detail/admin-confirmed-detail.component';
import { ErrorComponent } from '../error/error.component';
import { AdminDatesComponent } from '../auth/admin-dates/admin-dates.component';
import { AdminComponent } from '../auth/admin/admin.component';
import { DatePickerComponent } from '../shared/date-picker/date-picker.component';
import { FirstStepComponent } from '../booking/first-step/first-step.component';
import { SecondStepComponent } from '../booking/second-step/second-step.component';
import { ThirdStepComponent } from '../booking/third-step/third-step.component';
import { FinalStepComponent } from '../booking/final-step/final-step.component';

const routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'admin', component: AdminComponent, canActivate: [AuthGuard]
  },
  {
    path: 'admin-home', component: AdminHomeComponent, canActivate: [AuthGuard]
  },
  {
    path: 'admin-dates', component: AdminDatesComponent, canActivate: [AuthGuard],   
  },
  {
    path: 'admin-confirmed', component: AdminConfirmedComponent, canActivate: [AuthGuard],   
  },
  {
    path: 'admin-confirmed-detail/:id', component: AdminConfirmedDetailComponent, canActivate: [AuthGuard]
  },
  {
    path: 'booking', component: BookingComponent, 
      children: [
         { path: 'first-step', component: FirstStepComponent }, 
         { path: 'second-step/:id', component: SecondStepComponent },
         { path: 'third-step/:id', component: ThirdStepComponent },
         { path: 'final-step', component: FinalStepComponent }
      ]
  },
  {
    path: 'datepicker', component: DatePickerComponent
  },
  {
    path: '**', component: ErrorComponent
  }
]


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports:[RouterModule]
})
export class RoutingModule { }
