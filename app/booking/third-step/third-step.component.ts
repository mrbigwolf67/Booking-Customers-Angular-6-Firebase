import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { dayColor } from '../../models/booking';

@Component({
  selector: 'app-third-step',
  templateUrl: './third-step.component.html',
  styleUrls: ['./third-step.component.scss']
})
export class ThirdStepComponent implements OnInit {
  dateLocalStorage: string;
  timeLocalStorage: string;
  secondStepDocIdLocalStorage: string;
  bookingForm: FormGroup;
  visible: boolean = false;
  documentIdOnBookingTime: string = '';
  timesLeftToBook: string;
  redColor: string;
  collectionMonth: string[];
  tiderCollectionRef: AngularFirestoreCollection<any>;
  monthDayDocRef: AngularFirestoreDocument<any>;
  updateTiderDocRef: AngularFirestoreDocument<any>;
  updateIfLastTimeWasBookedDocRef: AngularFirestoreDocument<any>;

  constructor(public fb: FormBuilder,
    private afs: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute) {
    this.bookingForm = fb.group({
      'name': [localStorage.getItem('name'), Validators.required],
      'personnumber': [null, Validators.required],
      'email': [localStorage.getItem('email'), Validators.email],
      'phone': [localStorage.getItem('phone'), Validators.required],
      'description': [null],
    });
    this.redColor = dayColor.rgbRedColor;
  }

  ngOnInit() {
    this.dateLocalStorage = localStorage.getItem('date');
    this.timeLocalStorage = localStorage.getItem('time');
    this.secondStepDocIdLocalStorage = localStorage.getItem('doc_id');
    this.timesLeftToBook = localStorage.getItem('timesLeft');
    this.collectionMonth = localStorage.getItem('date').split('-');
    this.route.paramMap.subscribe(params => {
      this.documentIdOnBookingTime = params.get('id');
    });

    this.tiderCollectionRef = this.afs.collection(this.collectionMonth[1]).doc(this.secondStepDocIdLocalStorage).collection('tider');
    this.monthDayDocRef = this.afs.collection(this.collectionMonth[1]).doc(`/${this.secondStepDocIdLocalStorage}`);
  }

  confirmForm() {
    if (this.bookingForm.valid) {
      this.visible = true;

      this.updateTiderDocRef = this.tiderCollectionRef.doc(`/${this.documentIdOnBookingTime}`);
      const updateTider = { booked: true };
      this.updateTiderDocRef.update(updateTider);

      if (this.timesLeftToBook === '1') { // är detta sista tiden för dagen ?       
        const uppdateraDayToRedColor = { color: this.redColor };
        this.monthDayDocRef.update(uppdateraDayToRedColor);
      }

      const booking = this.afs.collection('bookingRequest');
      const data = {
        name: this.bookingForm.value.name,
        persnumber: this.bookingForm.value.personnumber,
        email: this.bookingForm.value.email,
        phone: this.bookingForm.value.phone,
        description: this.bookingForm.value.description,
        date: this.dateLocalStorage,
        time: this.timeLocalStorage,
        status: 'väntande',
      }

      booking.add(data)
        .then(() => {
          this.router.navigate(['/booking/final-step']);
          localStorage.setItem('name', this.bookingForm.value.name);
          localStorage.setItem('email', this.bookingForm.value.email);
          localStorage.setItem('phone', this.bookingForm.value.phone);
          this.bookingForm = null;
          localStorage.removeItem('date');
          localStorage.removeItem('time');
          localStorage.removeItem('personnumber');
          localStorage.removeItem('doc_id');
          this.visible = false;
        })
        .catch(error => {
          console.log(error);
          this.visible = false;
        });
    }
  }

}
