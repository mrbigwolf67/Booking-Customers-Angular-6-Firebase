import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap, map, take } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastService } from 'ng-uikit-pro-standard'
import { FindValueSubscriber } from '../../../node_modules/rxjs/internal/operators/find';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private router: Router,
    private toast: ToastService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.afAuth.authState
      .pipe(
        take(1),
          map(user => !!user),
            tap(loggedIn => {              
              this.authService.isLoginSubject.next(true);
          if (!loggedIn) {            
            this.toast.error('Du är inte behörig för att visa sidan! Logga in som administratör.');
            this.authService.isLoginSubject.next(false);
            this.router.navigate(['/login']);
          }
        })
      )    
  }
}
