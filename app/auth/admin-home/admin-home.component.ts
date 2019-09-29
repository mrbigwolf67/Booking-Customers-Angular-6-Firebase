import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'
import { Observable, Subscription } from 'rxjs';
import { ToastService } from 'ng-uikit-pro-standard';
import { Booking } from '../../models/booking';
import { FirestoreService } from '../../shared/services/firestore.service';


@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit, OnChanges {

  bookingCollection: AngularFirestoreCollection<Booking>;
  bookings: Observable<Booking[]>;

  rForm: FormGroup;
  post: any;                     // A property for our submitted form
  description: string = '';
  name: string = '';
  titleAlert: string;
  bookingSubscription: Subscription;

  constructor(
    private afs: AngularFirestore,
    private toast: ToastService, 
    private firestoreService: FirestoreService) {
  }

  ngOnInit() {
 this.bookings = this.firestoreService.colWithIds$('bookingRequest',
      ref => ref.where('status', '==', 'väntande').orderBy('date').orderBy('time'));     
  }

  ngOnChanges() {

  }

  addPost(post) {
    this.description = post.description;
    this.name = post.name;
  }

  confirmBooking(id: string, name: string) {
    const doc = this.afs.doc(`bookingRequest/${id}`);
    doc.update({ status: 'bokad' })
      .then(() => {
        this.toast.success('Bokningen bekräftad för ' + name);
      })
      .catch(err => {
        this.toast.error(err);
      });
  }

}
