import { Component, OnInit, Input, OnChanges, Output } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '../../../../node_modules/@angular/router';
import { FirestoreService } from '../services/firestore.service';
import { dayColor } from '../../models/booking';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit, OnChanges {

  @Input('month') monthString: string;
  @Input('admin') admin: string;

  days: any[];
  redColor: string;
  greenColor: string;
  squareElement: HTMLElement;
  yearMonthDay: string;
  monthCollectionRef: AngularFirestoreCollection<any>;
  tiderCollectionRef: AngularFirestoreCollection<any>;
  updateTiderDocRef: AngularFirestoreDocument<any>;
  dayTimesDocRef: AngularFirestoreDocument<any>;
  monthDays: Observable<any[]>;
  timesOfDay: Observable<any[]>;
  waitForData: boolean = false;
  showBookedClients: boolean = false;  

  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private firestoreService: FirestoreService) {
    this.greenColor = dayColor.rgbGreenColor;
    this.redColor = dayColor.rgbRedColor;

  }

  ngOnChanges() {
    this.monthDays = null;   
    this.timesOfDay = null;
    this.waitForData = true;
    setTimeout(() => {
      const month = this.monthString;
      this.monthDays = this.firestoreService.colWithIds$(month, query => query.orderBy('id'));      
      this.waitForData = false;
    }, 1000);
  }

  ngOnInit() { }

  squareClick(id: any, doc_id: string, value: string) {
    if (this.admin === 'admin') {
      this.adminDates(id, doc_id, value);
    } else {
      const month = this.monthString;
      this.squareElement = document.getElementById(id);
      if (this.squareElement.style.backgroundColor === this.redColor || this.squareElement.style.backgroundColor === '') {
        alert('Datumet är stängt eller inte öppnat för bokning.');
      } else {
        const answer = confirm('Vill du boka ' + '2018-' + month + '-' + id + ' ?');
        if (answer === true) {
          localStorage.setItem('date', '2018-' + month + '-' + id);
          this.router.navigateByUrl('booking/second-step/' + doc_id);
        }
      }
    }
  }

  adminDates(id: any, doc_id: string, value: string) {
    const dateString = this.monthString;
    if (this.showBookedClients) {
      this.yearMonthDay = '2018-' + dateString + '-' + value;
    } else {

      this.squareElement = document.getElementById(id);
      const itemDoc = this.afs.doc(dateString + `/${doc_id}`);

      this.tiderCollectionRef = this.afs.collection(dateString).doc(doc_id).collection('tider');
      this.timesOfDay = this.afs.collection(dateString).doc(doc_id).collection('tider', query => query.orderBy('id')).snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const doc_id = a.payload.doc.id;         
          return { doc_id, ...data as {} };
        });
      }));


      this.dayTimesDocRef = this.afs.doc(dateString + `/${doc_id}`);
      if (this.squareElement.style.backgroundColor === this.redColor) {
        this.squareElement.style.backgroundColor = this.greenColor;
      } else {
        this.squareElement.style.backgroundColor = this.redColor;
      }

      const updateData = {
        id: id, value: value, color: this.squareElement.style.backgroundColor,
      };
      this.dayTimesDocRef.update(updateData);
    }
  }

  clickedCheckbox(box, bookad, id) {
    this.updateTiderDocRef = this.tiderCollectionRef.doc(`/${id}`);
    const updateTider = { booked: !bookad };
    this.updateTiderDocRef.update(updateTider);
  }

}
