import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthGuard } from './../auth/auth.guard';
import { AuthService } from './../auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnChanges {
  isLoggedIn : Observable<boolean>;

  constructor(
    public authService: AuthService) { 
      
    }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  ngOnChanges() {
   // this.isLoggedIn = this.authService.isLoggedIn();
  }

}
