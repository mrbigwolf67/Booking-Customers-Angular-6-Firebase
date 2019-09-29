import { Component, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent implements OnInit, OnChanges {
  isLoggedIn: Observable<boolean>;
  constructor(public authService: AuthService) {

  }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  ngOnChanges() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  loggaUt() {
    this.authService.signOut();
  }

}
