
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA, Optional, SkipSelf } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore'
import { AngularFireStorageModule } from 'angularfire2/storage'
import { AngularFireAuthModule } from 'angularfire2/auth'

import { MDBSpinningPreloader, MDBBootstrapModulesPro, ToastModule, InputsModule, WavesModule, TimePickerModule, DatepickerModule } from 'ng-uikit-pro-standard';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { BookingComponent } from './booking/booking.component';
import { LoginComponent } from './auth/login/login.component';
import { RoutingModule } from './routing/routing.module';
import { environment } from '../environments/environment';
import { AdminHomeComponent } from './auth/admin-home/admin-home.component';
import { AdminConfirmedComponent } from './auth/admin-confirmed/admin-confirmed.component';
import { AdminConfirmedDetailComponent } from './auth/admin-confirmed-detail/admin-confirmed-detail.component';
import { ErrorComponent } from './error/error.component';
import { AdminDatesComponent } from './auth/admin-dates/admin-dates.component';
import { AdminComponent } from './auth/admin/admin.component';
import { DatePickerComponent } from './shared/date-picker/date-picker.component';
import { FirstStepComponent } from './booking/first-step/first-step.component';
import { SecondStepComponent } from './booking/second-step/second-step.component';
import { ThirdStepComponent } from './booking/third-step/third-step.component';
import { FinalStepComponent } from './booking/final-step/final-step.component';
import { StepNavbarComponent } from './booking/step-navbar/step-navbar.component';
import { DateService } from './auth/date.service';
import { CalendarComponent } from './shared/calendar/calendar.component';
import { WeekdaysComponent } from './shared/calendar/weekdays/weekdays.component';
import { BookedClientsComponent } from './auth/booked-clients/booked-clients.component';
import { AdminNavbarComponent } from './navbar/admin-navbar/admin-navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    BookingComponent,
    LoginComponent,
    AdminHomeComponent,
    AdminConfirmedComponent,
    AdminConfirmedDetailComponent,
    ErrorComponent,
    AdminDatesComponent,
    AdminComponent,
    DatePickerComponent,
    FirstStepComponent,
    SecondStepComponent,
    ThirdStepComponent,
    FinalStepComponent,
    StepNavbarComponent,
    CalendarComponent,
    WeekdaysComponent,
    BookedClientsComponent,
    AdminNavbarComponent
   
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    RoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    InputsModule,
    WavesModule,
    TimePickerModule,
    DatepickerModule,
    ReactiveFormsModule,
    HttpModule,
    ToastModule.forRoot(),
    MDBBootstrapModulesPro.forRoot(),
    AgmCoreModule.forRoot({
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
      apiKey: 'Your_api_key'
    }),
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ],
  providers: [MDBSpinningPreloader, DateService],
  bootstrap: [AppComponent],
  schemas:      [ NO_ERRORS_SCHEMA ]
})
export class AppModule {
  constructor( @Optional() @SkipSelf() parentModule: AppModule,
               private afs: AngularFirestore ) {

    const settings = { timestampsInSnapshots: true };
    this.afs.firestore.settings( settings );
  }
 }
