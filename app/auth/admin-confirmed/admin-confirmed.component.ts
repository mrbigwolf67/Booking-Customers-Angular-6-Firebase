import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Booking } from '../../models/booking';


@Component({
  selector: 'app-admin-confirmed',
  templateUrl: './admin-confirmed.component.html',
  styleUrls: ['./admin-confirmed.component.scss']
})
export class AdminConfirmedComponent implements OnInit {

  bookingCollection: AngularFirestoreCollection<Booking>;
  bookings: Observable<Booking[]>;
  constructor(
    private afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.bookingCollection = this.afs.collection('bookingRequest', ref => ref.where('status', '==', 'bokad').orderBy('date').orderBy('time'));

    this.bookings = this.bookingCollection.snapshotChanges().pipe(map(arr => {
      return arr.map(snap => {
        const data = snap.payload.doc.data();
        const id = snap.payload.doc.id;
        return { id, ...data };
      })
    }));
  }

}
