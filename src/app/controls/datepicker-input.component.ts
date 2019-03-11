import { AfterViewInit, Component, forwardRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateInputComponent } from '@progress/kendo-angular-dateinputs';
import { BaseControlValueAccessor } from './base-control-value-accessor';

declare var kendo: any;

@Component({
  selector: 'app-datepicker-input',
  template: `
  <kendo-dateinput [(ngModel)]="value" format="d.M.yyyy" placeholder="" #dateInput></kendo-dateinput>
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
  @ViewChild('dateInput') dateInput: DateInputComponent;

  constructor() {
    super();
  }
  ngAfterViewInit(): void {
    this.setKendoCulture();
    const nativeElement = kendo.jQuery(this.dateInput.dateInput.nativeElement);
    nativeElement.kendoDatePicker({
      format: 'dd.MM.yyyy',
      parseFormats: ['d.M.yyyy', 'dd.MM.yyyy'],
      change: e => {
        this.value = e.sender.value() as Date;
        this.onChange(this.value);
      }
    });
  }

  private setKendoCulture() {
    kendo.culture().calendar.firstDay = 1;
    kendo.culture().calendar.days = {
      // full day names
      names: ['Neděle', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota'],
      // abbreviated day names
      namesAbbr: ['Ned', 'Pon', 'Úte', 'Stř', 'Čtv', 'Pát', 'Sob'],
      // shortest day names
      namesShort: ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So']
    };
    kendo.culture().calendar.months = {
      // full month names
      names: ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'],
      // abbreviated month names
      namesAbbr: ['Led', 'Úno', 'Bře', 'Dub', 'Kvě', 'Čen', 'Čec', 'Srp', 'Zář', 'Říj', 'Lis', 'Pro']
    };
  }
}
