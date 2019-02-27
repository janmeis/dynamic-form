import { QuestionBase } from './question-base';

export class DatepickerQuestion extends QuestionBase<Date> {
  controlType = 'datepicker';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
