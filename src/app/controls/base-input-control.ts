import { IBaseControl, cntrlType } from './ibase-control';

export abstract class BaseInputControl<T> implements IBaseControl {
  key: string;
  label: string;
  order: number;
  controlType: cntrlType;
  value: T;
  size: string; // bootstrap md size
  required: {
    value: boolean,
    text: string
  };

  constructor(options: {
    key?: string,
    label?: string,
    value?: T,
    size?: string,
    required?: {
      value: boolean,
      text?: string
    },
    order?: number,
  }) {
    this.key = options.key || '';
    this.label = options.label || '';
    this.value = options.value;
    this.size = options.size || '';
    this.required = {
      value: options.required ? !!options.required.value : false,
      text: options.required ? options.required.text || '' : ''
    }
    this.order = options.order === undefined ? 1 : options.order;
  }
}