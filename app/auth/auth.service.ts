import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable, of, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public data: any;
  public user: Observable<User>
  public isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) {

    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      }))
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  private hasToken() : boolean {
    return !!localStorage.getItem('token');
  }

  emailSignIn(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(res => {
          localStorage.setItem('token', 'JWT');
          this.isLoginSubject.next(true);
          resolve(res);
        }, err => {
          localStorage.removeItem('token');
          this.isLoginSubject.next(false);
          reject(err);
        })
    })
  }

  signOut() {
    this.afAuth.auth.signOut()
      .then(() => {
        localStorage.removeItem('token');
        this.isLoginSubject.next(false);
        this.router.navigate(['login']);
      })
  }
}

