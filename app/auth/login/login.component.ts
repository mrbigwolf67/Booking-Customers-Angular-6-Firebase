import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'ng-uikit-pro-standard'
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoggedIn: Observable<boolean>;
  signInform: FormGroup;
  constructor(
    public fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: ToastService) {

    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.router.navigate(['admin']);
    }

    this.signInform = fb.group({
      'email': [null, Validators.email],
      'password': [null, [
        // Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),  
        Validators.minLength(6)]],
    });
  }

  ngOnInit() { }

  logIn() {
    let options = { toastClass: 'opacity', enableHtml: false, positionClass: 'toast-bottom-right' };
    return this.authService.emailSignIn(this.signInform.value.email, this.signInform.value.password)
      .then(user => {
        if (user !== null) {         
          this.signInform.reset();
          this.router.navigate(['admin']);
        }
      })
      .catch(error => {
        this.toast.error(error.message, options);
      })
  }

}
