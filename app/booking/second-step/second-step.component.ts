import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirestoreService } from '../../shared/services/firestore.service';

@Component({
  selector: 'app-second-step',
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.scss']
})
export class SecondStepComponent implements OnInit {
  userForm: FormGroup;
  visible: boolean = true;
  optionsSelect: Array<any>;
  selectedValue: string;
  timesOfDay$: Observable<any[]>;
  documentId: string = '';
  collectionMonth: string[] = [];

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private firestoreService: FirestoreService) {
    this.userForm = fb.group({
      'time': [null, Validators.required],
    });

    this.selectedValue = null;
  }

  ngOnInit() {
    setTimeout(() => {
      this.route.paramMap.subscribe(params => {
        this.documentId = params.get('id');
      });
      this.collectionMonth = localStorage.getItem('date').split('-');

      this.afs.collection(this.collectionMonth[1]).doc(this.documentId).collection('tider', query => query.where('booked', '==', false).orderBy('id')).snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const doc_id = a.payload.doc.id;
          return { doc_id, ...data as {} };
        });
      })).subscribe(data => {
        this.optionsSelect = data;        
      });
     
      this.visible = false;
    }, 1000);

  }

  getSelectedValue(event: any) {
    this.selectedValue = event;
  }

  goToNext() {
    if (this.selectedValue) {
      let result = this.optionsSelect.filter(obj => {
        return obj.label === this.selectedValue;
      })
      localStorage.setItem('time', this.selectedValue);
      localStorage.setItem('doc_id', this.documentId);
      localStorage.setItem('timesLeft', this.optionsSelect.length.toString() )
      this.router.navigateByUrl('/booking/third-step/' + result[0].doc_id);
    }
  }

}
