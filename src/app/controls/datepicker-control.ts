import { BaseInputControl } from './base-input-control';

export class DatepickerControl extends BaseInputControl<Date> {
  
  constructor(options: {} = {}) {
    super(options);
    this.controlType = 'datepicker';
  }
}
