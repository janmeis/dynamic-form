import { AfterViewInit, Component, ElementRef, forwardRef, OnDestroy, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControlValueAccessor } from './base-control-value-accessor';

declare var kendo: any;

@Component({
  selector: 'app-datepicker-input',
  template: `
  <input #datePicker>
  {{value}}
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerInputComponent),
      multi: true
    }
  ]
})
export class DatepickerInputComponent extends BaseControlValueAccessor<Date> implements AfterViewInit {
  value: Date;
  @ViewChild('datePicker') datePickerEl: ElementRef;

  constructor() {
    super();
  }
  ngAfterViewInit(): void {
    this.setKendoCulture();
    const nativeElement = kendo.jQuery(this.datePickerEl.nativeElement);
    nativeElement.kendoMaskedTextBox({ mask: '00.00.0000' });
    nativeElement.kendoDatePicker({
      format: 'dd.MM.yyyy',
      parseFormats: ['d.M.yyyy', 'dd.MM.yyyy'],
      change: (e: { sender: { value: () => Date } }) =>
        setTimeout(() => {
          this.value = e.sender.value();
          this.onChange(this.value);
        }, 0)
    });
    nativeElement.closest('.k-datepicker')
      .add(nativeElement)
      .removeClass('k-textbox');
    const datePicker = nativeElement.data('kendoDatePicker');
    datePicker.value(this.value);
    datePicker.trigger('change');
  }

  private setKendoCulture() {
    kendo.culture().calendar.firstDay = 1;
    kendo.culture().calendar.days = {
      // full day names
      names: ['Neděle', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota'],
      // abbreviated day names
      namesAbbr: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      // shortest day names
      namesShort: ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So']
    };
    kendo.culture().calendar.months = {
      // full month names
      names: ['Leden', 'Únor', 'Březen', 'Duben', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      // abbreviated month names
      namesAbbr: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    };
  }
}
