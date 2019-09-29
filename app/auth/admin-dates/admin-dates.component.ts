import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dates',
  templateUrl: './admin-dates.component.html',
  styleUrls: ['./admin-dates.component.scss']
})
export class AdminDatesComponent implements OnInit {
  optionsSelect_1: Array<any>;
  optionsSelect_2: Array<any>;
  selectedValue_1: string;
  selectedValue_2: string;
  constructor() {}

  ngOnInit() {
    this.optionsSelect_1 = [     
      { value: '09', label: 'September' },
      { value: '10', label: 'Oktober' },
      { value: '11', label: 'November' },
      { value: '12', label: 'December' }
    
  ];
  this.optionsSelect_2 = [   
    { value: '09', label: 'September' },
    { value: '10', label: 'Oktober' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  
];
  this.selectedValue_1 = this.optionsSelect_1[0].value;
  this.selectedValue_2 = this.optionsSelect_2[0].value;
  }  

  getSelectedValue_1(event: any) {
    this.selectedValue_1 = event; 
  }

  getSelectedValue_2(event: any) {
    this.selectedValue_2 = event; 
  }

}
