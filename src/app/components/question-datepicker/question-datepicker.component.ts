import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

declare var kendo: any;

@Component({
  selector: 'app-question-datepicker',
  templateUrl: './question-datepicker.component.html'
})
export class QuestionDatepickerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('datePicker') datePickerEl: ElementRef;
  @Input() formControl: FormControl;

  constructor(private hostEl: ElementRef) { }
  ngAfterViewInit(): void {
    this.setKendoCulture();
    const nativeElement = kendo.jQuery(this.datePickerEl.nativeElement);
    nativeElement.kendoDatePicker({
      format: 'd.M.yyyy',
      parseFormats: ['d.M.yyyy', 'dd.MM.yyyy'],
      change: e =>
        this.formControl.setValue(e.sender.value())
    });
    const datePicker = nativeElement.data('kendoDatePicker');
    datePicker.value(this.formControl.value);
  }
  ngOnDestroy(): void {
    kendo.destroy(this.hostEl.nativeElement);
  }

  private setKendoCulture() {
    kendo.culture().calendar.firstDay= 1;
    kendo.culture().calendar.days = {
        // full day names
        names: ['Neděle', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota'],
        // abbreviated day names
        namesAbbr: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        // shortest day names
        namesShort: [ 'Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So' ]
    };
    kendo.culture().calendar.months = {
        // full month names
        names: ['Leden', 'Únor', 'Březen', 'Duben', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        // abbreviated month names
        namesAbbr: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    };    
  }
}
