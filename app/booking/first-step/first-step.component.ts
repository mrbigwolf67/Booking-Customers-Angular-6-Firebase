import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'

@Component({
  selector: 'app-first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.scss']
})
export class FirstStepComponent implements OnInit {
  optionsSelect: Array<any>;
  selectedValue: string;
  title = 'Boknings steg';
  dateLocalStorage :string;

  @Input() formData;
  bookingForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    private router: Router) { 
      this.bookingForm = fb.group({        
        'date': ['', Validators.minLength(10)]
      });
      this.optionsSelect = [       
        { value: '09', label: 'September' },
        { value: '10', label: 'Oktober' },
        { value: '11', label: 'November' },
        { value: '12', label: 'December' }
      
    ];
    this.selectedValue = this.optionsSelect[0].value;
    }

  ngOnInit() {
    this.dateLocalStorage = localStorage.getItem('date');    
  }

  getSelectedValue(event: any) {
    this.selectedValue = event; 
  }
}
