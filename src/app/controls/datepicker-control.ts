import { BaseInputControl } from './base-input-control';

export class DatepickerControl extends BaseInputControl<string> {
  
  constructor(options: {} = {}) {
    super(options);
    this.controlType = 'datepicker';
  }
}
