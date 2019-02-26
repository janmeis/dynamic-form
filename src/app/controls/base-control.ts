export type cntrlType = 'group' | 'textbox' | 'datepicker' | 'dropdown';

export abstract class BaseControl {
  label: string;
  order: number;
  controlType: cntrlType;

  constructor(options: {
    label?: string
    order?: number
  } = {}) {
    this.label = options.label || '';
    this.order = options.order === undefined ? 1 : options.order;
  }
}
