import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore'
import { Observable } from 'rxjs';
import { Booking } from '../models/booking'



@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {


  bookingCollection: AngularFirestoreCollection<Booking>;
  bookings: Observable<Booking[]>;
  bookingForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private afs: AngularFirestore) {
    // Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'), 
   
    this.bookingForm = fb.group({
      'name': [null, Validators.maxLength(20)],
      'personnumber': [null, Validators.required],
      'email': [null, Validators.email],
      'phone': [null, Validators.required],
      'description': [null],
      'date': [null]
    });
  }

  ngOnInit() {
  }

  sendRequestForBooking() {    
    if (this.bookingForm.valid) {
      const booking = this.afs.collection('bookingRequest');
      const data = {
        name: this.bookingForm.value.name,
        persnumber: this.bookingForm.value.personnumber,
        email: this.bookingForm.value.email,
        phone: this.bookingForm.value.phone,
        description: this.bookingForm.value.description,
        date: new Date(this.bookingForm.value.date),  // new Date("2018-08-12 08:00"),
        status: 'väntande',
      }

      booking.add(data)
        .then(() => {
          // this.toast.success('Bokning Skickad');
          // this.toast.info('Mats Clavell kontaktar dig för bekräftelse eller ombokning.');
          this.router.navigate(['']);
        })
        .catch(error => console.log(error));
    }

  }

}
