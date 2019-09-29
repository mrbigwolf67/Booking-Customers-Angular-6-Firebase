import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  days: any;
  monthCollection: AngularFirestoreCollection<any>;
  manad: string;
  constructor(
    private afs: AngularFirestore,
  ) { }

  ngOnInit() {
  //   this.manad = '11';
  //   this.days = [
  //     { id: '01', value: '1', color: 'none' },
  //     {
  //       id: '02', value: '2', color: 'none'
  //     },
  //     {
  //       id: '03', value: '3', color: 'none'
  //     },
  //     {
  //       id: '04', value: '4', color: 'none'
  //     },
  //     {
  //       id: '05', value: '5', color: 'none'
  //     },
  //     {
  //       id: '06', value: '6', color: 'none'
  //     },
  //     {
  //       id: '07', value: '7', color: 'none'
  //     },
  //     {
  //       id: '08', value: '8', color: 'none'
  //     },
  //     {
  //       id: '09', value: '9', color: 'none'
  //     },
  //     {
  //       id: '10', value: '10', color: 'none'
  //     },
  //     {
  //       id: '11', value: '11', color: 'none'
  //     },
  //     {
  //       id: '12', value: '12', color: 'none'
  //     },
  //     {
  //       id: '13', value: '13', color: 'none'
  //     },
  //     {
  //       id: '14', value: '14', color: 'none'
  //     },
  //     {
  //       id: '15', value: '15', color: 'none'
  //     },
  //     {
  //       id: '16', value: '16', color: 'none'
  //     },
  //     {
  //       id: '17', value: '17', color: 'none'
  //     },
  //     {
  //       id: '18', value: '18', color: 'none'
  //     },
  //     {
  //       id: '19', value: '19', color: 'none'
  //     },
  //     {
  //       id: '20', value: '20', color: 'none'
  //     },
  //     {
  //       id: '21', value: '21', color: 'none'
  //     },
  //     {
  //       id: '22', value: '22', color: 'none'
  //     },
  //     {
  //       id: '23', value: '23', color: 'none'
  //     },
  //     {
  //       id: '24', value: '24', color: 'none'
  //     },
  //     {
  //       id: '25', value: '25', color: 'none'
  //     },
  //     {
  //       id: '26', value: '26', color: 'none'
  //     },
  //     {
  //       id: '27', value: '27', color: 'none'
  //     },
  //     {
  //       id: '28', value: '28', color: 'none'
  //     },
  //     {
  //       id: '29', value: '29', color: 'none'
  //     },
  //     {
  //       id: '30', value: '30', color: 'none'
  //     },
  //     {
  //       id: '31', value: '31', color: 'none'
  //     }
  //   ];

  //   this.monthCollection = this.afs.collection(this.manad);

  //   var i;
  //   setTimeout(() => {
  //   for (i = 0; i <= 30; i++) {
      
  //       this.monthCollection.add(this.days[i]).then(ref => {
  //         this.afs.collection(this.manad).doc(ref.id).collection('tider')
  //           .add({ id: '08', label: '08:00', value: '08:00', booked: false });

  //         this.afs.collection(this.manad).doc(ref.id).collection('tider')
  //           .add({ id: '09', label: '09:00', value: '09:00', booked: false });

  //         this.afs.collection(this.manad).doc(ref.id).collection('tider')
  //           .add({ id: '10', label: '10:00', value: '10:00', booked: false });

  //         this.afs.collection(this.manad).doc(ref.id).collection('tider')
  //           .add({ id: '11', label: '11:00', value: '11:00', booked: false });

  //         this.afs.collection(this.manad).doc(ref.id).collection('tider')
  //           .add({ id: '12', label: '12:00', value: '12:00', booked: false });

  //         this.afs.collection(this.manad).doc(ref.id).collection('tider')
  //           .add({ id: '13', label: '13:00', value: '13:00', booked: false });

  //         this.afs.collection(this.manad).doc(ref.id).collection('tider')
  //           .add({ id: '14', label: '14:00', value: '14:00', booked: false });

  //         this.afs.collection(this.manad).doc(ref.id).collection('tider')
  //           .add({ id: '15', label: '15:00', value: '15:00', booked: false });

  //       });     
  //   }
  // }, 400);

 }

}
