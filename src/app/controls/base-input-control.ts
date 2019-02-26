export class BaseInputControl<T> {
  key: string;
  label: string;;
  value: T;
  size: string; // bootstrap md size
  required: {
    value: boolean,
    text: string
  };
  order: number;
  controlType: string;

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
    controlType?: string
  } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.size = options.size || '';
    this.required = {
      value: options.required ? !!options.required.value : false,
      text: options.required ? options.required.text || '' : ''
    }
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
  }
}