import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Query } from '@firebase/firestore-types'
import * as firebase from 'firebase/app';

// The T is a Typescript generic that allows us to use our custom interfaces
type CollectionPredicate<T> = string | AngularFirestoreCollection<T>;
type DocPredicate<T> = string | AngularFirestoreDocument<T>;

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  query: Query;
  constructor(
    private afs: AngularFirestore) { }
  // Methods wraps the afsdoc and collection, so the service can be used as a drop and replacement for AngularFirestore
  // If we pass a string is going to return a AngularFirestoreCollection ref
  // But if we pass a ref, then it'll just returnthe ref
  col<T>(ref: CollectionPredicate<T>, queryFn?): AngularFirestoreCollection<T> {
    return typeof ref === 'string' ? this.afs.collection<T>(ref, queryFn) : ref;
  }

  doc<T>(ref: DocPredicate<T>): AngularFirestoreDocument<T> {
    return typeof ref === 'string' ? this.afs.doc<T>(ref) : ref;
  }

  // ****Get Data ******
  doc$<T>(ref: DocPredicate<T>):Observable<T>{
    return this.doc(ref).snapshotChanges().pipe(map(doc=>{
      return doc.payload.data() as T;
    }))
   }

  col$<T>(ref: CollectionPredicate<T>, queryFn?): Observable<T[]> {
    return this.col(ref, queryFn).snapshotChanges().pipe(map(docs => {
      return docs.map(a => a.payload.doc.data()) as T[];
    }))
  }

  /// with Ids
  colWithIds$<T>(ref: CollectionPredicate<T>, queryFn?): Observable<any[]> {    
    return this.col(ref, queryFn)
      .snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const doc_id = a.payload.doc.id;
          return { doc_id, ...data as {} };
        });
      }));
  }
  /// **************
  /// Inspect Data
  /// **************


  // inspectDoc(ref: DocPredicate<any>): void {
  //   const tick = new Date().getTime()
  //   this.doc(ref).snapshotChanges()
  //       .take(1)
  //       .do(d => {
  //         const tock = new Date().getTime() - tick
  //         console.log(`Loaded Document in ${tock}ms`, d)
  //       })
  //       .subscribe()
  // }


  // inspectCol(ref: CollectionPredicate<any>): void {
  //   const tick = new Date().getTime()
  //   this.col(ref).snapshotChanges()
  //       .take(1)
  //       .do(c => {
  //         const tock = new Date().getTime() - tick
  //         console.log(`Loaded Collection in ${tock}ms`, c)
  //       })
  //       .subscribe()
  // }

}
