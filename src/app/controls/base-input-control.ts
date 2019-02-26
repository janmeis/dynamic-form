import { BaseControl } from './base-control';

export abstract class BaseInputControl<T> extends BaseControl {
  key: string;
  value: T;
  size: string; // bootstrap md size
  required: {
    value: boolean,
    text: string
  };

  constructor(options: {
    value?: T,
    key?: string,
    label?: string,
    size?: string,
    required?: {
      value: boolean,
      text?: string
    },
    order?: number,
  } = {}) {
    super(options)
    this.value = options.value;
    this.key = options.key || '';
    this.size = options.size || '';
    this.required = {
      value: options.required ? !!options.required.value : false,
      text: options.required ? options.required.text || '' : ''
    }
  }
}