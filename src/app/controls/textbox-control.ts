import { BaseInputControl } from './base-input-control';

export class TextboxControl extends BaseInputControl<string> {
  type: string;
  
  constructor(options: {} = {}) {
    super(options);
    this.controlType = 'textbox';
    this.type = options['type'] || '';
  }
}
