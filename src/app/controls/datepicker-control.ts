import { BaseInputControl } from './base-input-control';

export class DatepickerControl extends BaseInputControl<string> {
  controlType = 'datepicker';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
