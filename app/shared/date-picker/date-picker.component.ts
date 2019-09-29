import { Component, OnInit } from '@angular/core';
import { IMyOptions } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent {
  public myDatePickerOptions: IMyOptions = {
      // Strings and translations
      dayLabels: {su: 'Sun', mo: 'Mon', tu: 'Tue', we: 'Wed', th: 'Thu', fr: 'Fri', sa: 'Sat'},
      dayLabelsFull: {su: "Sunday", mo: "Monday", tu: "Tuesday", we: "Wednesday", th: "Thursday", fr: "Friday", sa: "Saturday"},
      monthLabels: { 1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec' },
      monthLabelsFull: { 1: "January", 2: "February", 3: "March", 4: "April", 5: "May", 6: "June", 7: "July", 8: "August", 9: "September", 10: "October", 11: "November", 12: "December" },

      // Buttons
      todayBtnTxt: "Today",
      clearBtnTxt: "Clear",
      closeBtnTxt: "Close",

      // Format
      dateFormat: 'yyyy-mm-dd',

      // First day of the week
      firstDayOfWeek: 'mo',

      // Disable dates
      // disableUntil: undefined,
      // disableSince: undefined,
      // disableDays: undefined,
      // disableDateRanges: undefined,
      disableWeekends: true,

      // Enable dates (when disabled)
     // enableDays: undefined,

      // Year limits
      minYear: 1000,
      maxYear: 9999,

      // Show Today button
      showTodayBtn: true,

      //Show Clear date button
      showClearDateBtn: true,

      markCurrentDay: true,
      // markDates: undefined,
      // markWeekends: undefined,
      disableHeaderButtons: false,
      showWeekNumbers: false,
      height: '80px',
      width: '50%',
      selectionTxtFontSize: '15px'
  };
}
