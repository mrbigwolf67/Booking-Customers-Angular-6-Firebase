import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-final-step',
  templateUrl: './final-step.component.html',
  styleUrls: ['./final-step.component.scss']
})
export class FinalStepComponent implements OnInit {

  constructor(
    private router: Router) { 

    }

  ngOnInit() {
    setTimeout(() => {
      this.navigateBack();
    }, 4000);
  }

  navigateBack() {
    this.router.navigateByUrl('');
  }

}
