import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  isLoggedIn: Observable<boolean>;
  constructor(
    private authService: AuthService) { 
      this.isLoggedIn = this.authService.isLoggedIn();
    }

  ngOnInit() {
  }

}
