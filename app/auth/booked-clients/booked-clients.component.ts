import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../shared/services/firestore.service';

@Component({
  selector: 'app-booked-clients',
  templateUrl: './booked-clients.component.html',
  styleUrls: ['./booked-clients.component.scss']
})
export class BookedClientsComponent implements OnInit, OnChanges {
  bookedClients: Observable<any[]>;
  @Input('bookedclients') bookedClientsOnDay: string
  constructor(private firestoreService: FirestoreService) { }

  ngOnInit() { }

  ngOnChanges() {
    this.bookedClients = this.firestoreService.colWithIds$('bookingRequest',
      query => query.where('date', '==', this.bookedClientsOnDay).orderBy('time'));
  }

}
